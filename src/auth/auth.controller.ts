import { Response, NextFunction } from 'express';

import { getUserByEmail } from '../api/user/user.service';
import { AuthRequest } from './auth.types';
import { User } from '../api/user/user.types';
import { verifyToken } from './auth.service';
import { Role } from '@prisma/client';



export const isAuthenticated = async (
  req: AuthRequest, 
  res: Response, 
  next: NextFunction
) => {
  const token = req.headers?.authorization?.split(' ')[1];
  
  if(!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  // Verify token
  const decoded = verifyToken(token)

  if(!decoded){
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = await getUserByEmail(decoded.email) as User

  req.user = user

  return next();
}

export const hasRole = (rolesAllowed: string[]) => {
  return (
    req: AuthRequest, 
    res: Response, 
    next: NextFunction
  ) => {
    const { role } = req.user as User;
    // PREGUNTA - Juan: Puse el type User pero no entiendo por qué funciona. Incluso si trato de tipar role no sé cómo hacerlo
    const hasPermission = rolesAllowed.includes(role)

    if (!hasPermission) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    return next();
  }
}
import { Request, Response } from 'express';
import { createTrip } from './trips.service';
import { AuthRequest } from '../../auth/auth.types';
import { User } from '@prisma/client';
import { getAllTrips } from './trips.service';

//import { AuthRequest } from '../../auth/auth.types';
//import { User } from '../user/user.types';
//import { Trip } from './trips.types';



export async function createTripHandler(req: AuthRequest, res: Response) {
  const { id } = req.user as User;
  const data = {
    ...req.body,
    user_id: id
  };

  const trip = await createTrip(data);

  return res.json(trip);
}

export async function getAllTripsHandler(req: Request, res: Response) {
  const trips = await getAllTrips();

  return res.json(trips);
}

/* export async function getTripsByUserIdHandler(req: AuthRequest, res: Response) {
  const { id } = req.user as User;

  const user = await getUserById(id);

  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }

  const trips = user.Trips

  return res.json(user);
} */
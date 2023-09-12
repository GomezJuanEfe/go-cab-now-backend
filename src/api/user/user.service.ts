import { PrismaClient } from '@prisma/client';

import { createHashToken, hashPassword } from '../../auth/utils/bcrypt';
import { User } from './user.types';

const prisma = new PrismaClient();

export async function getAllUser(id: string) {
  try {
    const users = await prisma.user.findMany({
      select: {
        email: true,
        first_name: true,
        last_name: true,
        role: true,
        address: true,
        phone: true,
        avatar: true,
        car: true,
        is_active: true,
        created_at: true,
        updated_at: true,
      },
      where: {
        id: {
          not: id,
        }
      },
      orderBy: {
        role: "desc"
      }
    });
    return users;
  } catch (error: any) {
    throw error;
  }
}

export async function createUser(input: User) {
  try {
      const hashedPassword = await hashPassword(input.password);
      const expiresIn = Date.now() + (60 * 60 * 24 * 1000);
    
      const data = {
        ...input,
        password: hashedPassword,
        reset_token: createHashToken(input.email),
        token_exp: new Date(expiresIn),
      }
    
      const user = await prisma.user.create({
        data
      });
    
      return user;
  } catch (error: any) {
    throw error;
  }
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
  
    return user;
  } catch (error: any) {
    throw error;
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
  
    return user;
  } catch (error: any) {
    throw error;
  }
}

export async function deleteUser(id: string) {
  try {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
  
    return user;
  } catch (error: any) {
    throw error;
  }
}

export async function updateUser(data: any, id: string) {
  try {
    const password = data.password;
    if (password) {
      const hashedPassword = await hashPassword(password);
      data.password = hashedPassword;
    }
    const user = await prisma.user.update({
      where: {
        id,
      },
      data,
    });

    return user;
  } catch (error: any) {
    throw error;
  }
}

export async function getDriversWithoutCar () {
  try {
    const drivers = await prisma.user.findMany({
      where: {
        AND: [
          { car: null},
          { role: 'DRIVER'}
        ]
      },
      select: {
        first_name: true,
        last_name: true,
        email: true,
        role: true,
        address: true,
        phone: true,
      },
    });

    return drivers;
  } catch (error: any) {
    throw error;
  }
}

export async function getUserByResetToken(resetToken: string) {
  const user = await prisma.user.findUnique({
    where: {
      reset_token: resetToken
    }
  });

  return user;
}
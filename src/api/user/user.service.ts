import { PrismaClient } from '@prisma/client';

import { hashPassword } from '../../auth/utils/bcrypt';
import { User } from './user.types';

const prisma = new PrismaClient();

export async function getAllUser() {
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
    
      const data = {
        ...input,
        password: hashedPassword
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
    // PREGUNTA-Juan: El argumento data está como any. Cómo se puede tipar correctamente este dato?
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

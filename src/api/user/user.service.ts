import { PrismaClient } from '@prisma/client';

import { hashPassword } from '../../auth/utils/bcrypt';
import { User } from './user.types';

const prisma = new PrismaClient();

export async function getAllUser() {
  // PREGUNTA - Juan: En el panel del ADMIN, cómo debería gestionar la petición de un usuario específico, por email? qué tipo de petición?
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
}

export async function createUser(input: User) {

  const hashedPassword = await hashPassword(input.password);

  const data = {
    ...input,
    password: hashedPassword
  }

  const user = await prisma.user.create({
    data
  });

  return user;
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}

export async function deleteUser(id: string) {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });

  return user;
}

export async function updateUser(data: any, id: string) {
  // PREGUNTA-Juan: El argumento data está como any. Cómo se puede tipar correctamente este dato?
  const password = data.password;
  if (password) {
    const hashedPassword = await hashPassword(password);
    data.password = hashedPassword;
  }
  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data,
  });

  return user;
}

import { Request, Response } from 'express';

import {
  createUser,
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
  getDriversWithoutCar
} from './user.service';
import { AuthRequest } from '../../auth/auth.types';
import { User } from './user.types';

export async function getAllUserHandler(req: AuthRequest, res: Response) {
  try {
    const { id } = req.user as User;

    const users = await getAllUser(id);

    res.status(202).json({message: 'Users have been found successfully', users });
  } catch ({ message }: any) {

    res.status(400).json({ message });
  }
}

export async function createUserHandler(req: Request, res: Response) {
  try {
    const data = req.body;

    const user = await createUser(data);

    const profile = {
      fullname: `${user.first_name} ${user.last_name}`,
      email: user.email,
      avatar: user.avatar,
    }

    res.status(201).json({ message: 'User has been created successfully', profile });
  } catch ({ message }: any) {

    res.status(400).json({ message })
  }
}

export async function getUserHandler(req: AuthRequest, res: Response) {
  try {

    const { id } = req.user as User;

    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const data = {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      address: user.address,
      phone: user.phone,
      avatar: user.avatar,
      is_active: user.is_active,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }

    res.status(200).json({ message: 'User has been found successfully', data });
  } catch ({ message }: any) {
    res.status(400).json({ message });
  }
}

export async function updateUserHandler(req: AuthRequest, res: Response) {
  try {
    const { id } = req.user as User;
  
    const user = await getUserById(id);
  
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
  
    const userUpdated = await updateUser(req.body, user.id);

    const data = {
      email: userUpdated.email,
      first_name: userUpdated.first_name,
      last_name: userUpdated.last_name,
      role: userUpdated.role,
      address: userUpdated.address,
      phone: userUpdated.phone,
      avatar: userUpdated.avatar,
    }
  
    res.status(202).json({ message: "Information updated sucessfully", data });
  } catch ({ message }: any) {
    res.status(400).json({ message });
  }
}


export async function deleteUserHandler(req: AuthRequest, res: Response) {
  try {
    const { id } = req.user as User;
  
    const user = await getUserById(id);
  
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
  
    await deleteUser(id);
  
    res.status(202).json({ message: 'User has been deleted', user });
  } catch ({ message }: any) {
    res.status(400).json({ message });
  }
}

export const getDriversWithoutCarHandler = async (req: Request, res: Response) => {
  try {
    const drivers = await getDriversWithoutCar();

    if (!drivers) {
      return res.status(204).json({
        message: 'No drives available'
      })
    }

    res.status(200).json({ message: "Drivers found successfully", drivers})
  } catch ({ message }: any) {
    res.status(400).json({ message: "Drives not found", error: message});
  }
}

export async function handleUploadImage (req: AuthRequest, res: Response) {
  try {
    const { id } = req.user as User;

    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const { avatar } = await updateUser(req.body, user.id) as any;

    res.status(202).json({ message: "Image was updated sucessfully", avatar });
  } catch ({ message }: any) {
    res.status(400).json({message: "There was an erro uploading the image", error: message});
  }
}
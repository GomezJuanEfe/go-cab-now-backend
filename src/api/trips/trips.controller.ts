import { Request, Response } from 'express';
import { createTrip } from './trips.service';
import { AuthRequest } from '../../auth/auth.types';
import { User } from '@prisma/client';
import { getAllTrips } from './trips.service';
import { getTripsByUserId } from './trips.service';
import { UserWithTrips } from '../user/user.types';

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

export async function getTripsByUserIdHandler(req: AuthRequest, res: Response) {
  console.log('hola mundo');
  
  const { id } = req.user as User;

  const trips = await getTripsByUserId(id);

  if (!trips) {
    return res.status(404).json({
      message: 'No trips',
    });
  }

 console.log(trips);
 
  return res.json(trips);
}
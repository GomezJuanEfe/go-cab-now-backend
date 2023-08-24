import { Request, Response } from 'express';
import { createTrip } from './trips.service';
import { AuthRequest } from '../../auth/auth.types';
import { User } from '@prisma/client';
import { getAllTrips } from './trips.service';
import { getTripsByUserId } from './trips.service';
import { getTripById } from './trips.service';
import { updateTrip } from './trips.service';
import { deleteTrip } from './trips.service';

export async function createTripHandler(req: AuthRequest, res: Response) {
  try{
    const { id } = req.user as User;
    const data = {
      ...req.body,
      user_id: id
    };
    const trip = await createTrip(data);

    res.status(201).json({ message: 'Trip has been created successfully', trip });
  } catch({ message }: any){
    res.status(400).json({ message })
  }
}

export async function getAllTripsHandler(req: Request, res: Response) {
  try{
    const trips = await getAllTrips();

    res.status(202).json({message: 'Trips have been found successfully', trips});
  } catch({ message }: any){
    res.status(400).json({ message })
  }
}

export async function getTripByIdHandler(req: Request, res: Response){
  try{
    const { id } = req.body;  
    const trip = await getTripById(id);

    res.status(202).json({message: 'Trip has been found successfully', trip});
  } catch({ message }: any){
    res.status(400).json({ message })
  }
}

export async function getTripsByUserIdHandler(req: AuthRequest, res: Response) {
  try {
    const { id } = req.user as User;
    const trips = await getTripsByUserId(id);

    if (!trips) {
      return res.status(404).json({
        message: 'No trips',
      });
    }

    res.status(202).json({message: 'User trips has been found successfully', trips});
  }catch({ message }: any){
    res.status(400).json({ message })
  }
}

export async function updateTripHandler(req: Request, res: Response) {
  try{
    const { id } = req.body;
    const trip = await getTripById(id);

    if (!trip) {
      return res.status(404).json({
        message: 'Trip not found',
      });
    }

    const tripUpdated = await updateTrip(req.body, trip.id)

    res.status(200).json({message: 'Trip has been updated successfully', tripUpdated});
  } catch ({ message }: any) {
    res.status(400).json({ message });
  }
}

export async function deleteTripHandler(req: Request, res: Response) {
  try{
    const { id } = req.body;
    const trip = await getTripById(id);

    if (!trip) {
      return res.status(404).json({
        message: 'Trip not found',
      });
    }

    await deleteTrip(id)

    res.status(202).json({message: 'Trip has been deleted successfully', trip});
  } catch ({ message }: any) {
    res.status(400).json({ message });
  }
}
import { Request, Response } from 'express'
import { AuthRequest } from '../../auth/auth.types';
import { User } from '../user/user.types'

import { 
  getAllCars,
  createCar, 
  getCarByDriverId, 
  getCarById,
  deleteCar, 
  updateCar,

} from './cars.service'

export const getAllCarsHandler = async (_: Request, res: Response) => {
 try {
    const cars = await getAllCars()

    return res.status(200).json({ message: "Cars have been found successfully" , cars})

  } catch ({ message}: any ) {
    res.status(400).json({ message: "Cars not found" });
  } 
}

export async function getCarHandler(req: Request, res: Response) {
  try {
    const { id } = req.body;

    const car = await getCarById(id);

    if (!car){
      return res.status(404).json({
        message: 'Car not found',
      })
    }

    const data = {
      id: car.id,
      car_name: car.car_name,
      type: car.type,
      img: car.img,
      seats: car.seats,
      luggage: car.luggage,
      air_conditioner: car.air_conditioner,
      transmition: car.transmition,
      fare_km: car.fare_km,
      driver_id: car.driver_id,
      created_at: car.created_at,
      updated_at: car.updated_at
    }

    return res.json({message: "Car have been found successfully", car});
  } catch ({ message }: any) {
    res.status(400).json({ message: "Car not found" });
  }  
}


export const createCarHandler = async (req: AuthRequest, res: Response) => {
  try {
    const data = req.body

    const carCreated = await createCar(data)

    return res.status(201).json({message: "Car was created successfully", carCreated})

  } catch ({ message}: any ) {
    res.status(400).json({ message: "Car wasn't created" });
  } 
}

export async function deleteCarHandler(req: Request, res:Response){
  try {

    const { id } = req.body
    const car = await deleteCar(id);
    
    if (!car) {
      return res.status(404).json({
        message: 'Car not found',
      });
    }
     
    return res.json({message:"Car deleted successfully", data: car})
  } catch ({message }: any) {
    res.status(400).json({ message });
  }
}

export async function updateCarHandler(req: AuthRequest, res: Response) {
  try {
    const { id } = req.user as User;
    const car = await getCarByDriverId(id);
  
    if (!car) {
      return res.status(404).json({
        message: 'Car not found',
      });
    }
  
    const carUpdated = await updateCar(req.body, car.id);

    const data = {
      id: carUpdated.id,
      car_name: carUpdated.car_name,
      type: carUpdated.type,
      img: carUpdated.img,
      seats: carUpdated.seats,
      luggage: carUpdated.luggage,
      air_conditioner: carUpdated.air_conditioner,
      transmition: carUpdated.transmition,
      fare_km: carUpdated.fare_km,
      driver_id: carUpdated.driver_id,
      created_at: carUpdated.created_at,
      updated_at: carUpdated.updated_at
    }
  
    return res.json({message: "Information was updated sucessfully", data});
    
  } catch ({ message }: any) {
    res.status(400).json({ message });
  }
}
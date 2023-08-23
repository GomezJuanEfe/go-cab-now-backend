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

export async function getCarHandler(req:AuthRequest, res: Response) {
  const { id } = req.user as User;

  const car = await getCarById(id);

  if (!car){
    return res.status(404).json({
      message: 'Car not found',
    })
  }
  return res.json(car);
}


export const createCarHandler = async (req: AuthRequest, res: Response) => {
  try {
    const data = req.body

  const carCreated = await createCar(data)

  return res.status(201).json(carCreated)
}

export async function deleteCarHandler(req: AuthRequest, res:Response){
  const { id } = req.user as  User
  const car = await getCarByDriverId(id);

  if (!car) {
    return res.status(404).json({
      message: 'Car not found',
    });
  }
 
  await deleteCar(car.id);

  return res.json({message:"Car deleted successufully", data: car})
}

export async function updateCarHandler(req: AuthRequest, res: Response){
  const { id } = req.user as User;
  const car = await getCarByDriverId(id);

  if (!car) {
    return res.status(404).json({
      message: 'Car not found',
    });
  }

  const carUpdated = await updateCar(req.body, car.id);

  return res.json({
    message: "Information was updated sucessfully",
    data: carUpdated
  });
}
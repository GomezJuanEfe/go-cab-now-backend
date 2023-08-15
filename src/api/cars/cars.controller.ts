import { Request, Response } from 'express'

import { 
  getAllCars,
  createCar
} from './cars.service'

export const getAllCarsHandler = async (_: Request, res: Response) => {
  const cars = await getAllCars()

  return res.status(200).json(cars)
}

export const createCarHandler = async (req: Request, res: Response) => {
  const data = req.body

  const carCreated = await createCar(data)

  return res.status(201).json(carCreated)
}
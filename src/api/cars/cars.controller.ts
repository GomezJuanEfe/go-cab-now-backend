import { Request, Response } from 'express'
import { AuthRequest } from '../../auth/auth.types';
import { User } from '../user/user.types'
import { Cars } from '@prisma/client';

import { 
  getAllCars,
  createCar, 
  getCarByDriverId, 
  getCarById,
  deleteCar, 
  updateCar,
  getAllCarsPaginated,
} from './cars.service'
import { getUserByEmail } from '../user/user.service';



export const getAllCarsHandler = async (_: Request, res: Response) => {
 try {
    const cars = await getAllCars()

    res.status(201).json({ message: "Cars have been found successfully" , cars})

  } catch ({ message}: any ) {
    res.status(400).json({ message: "Cars not found" });
  } 
}

export async function getCarHandler(req: AuthRequest, res: Response) {
  try {
    const { id } = req.user as User;

    const cars = await getCarByDriverId(id);

    if (!cars){
      return res.status(404).json({
        message: "Car not found",
      })
    }

    res.status(201).json({message: "Car have been found successfully", cars});
    
  } catch ({ message }: any) {
    res.status(400).json({ message: "Car not found", error: message });
  }  
}

export async function handleCreateCarImage (req: AuthRequest, res: Response) {
  try {
    const { driver_email, car_info} = req.body;
    const { id }: any = await getUserByEmail(driver_email)

    const data = {
      ...car_info,
      driver_id: id,
    };

    const { img } = await createCar(data)

    res.status(202).json({ message: 'Image was upload sucessfully', img })
  } catch ({ message }: any) {
    res.status(400).json({message: 'There was an error uploading image', error: message})
  }
}

export async function handleUpdateCarImage (req: AuthRequest, res: Response) {

  try {
    console.log(req.body);
    const { id } = req.body;
    const car = await getCarById(id) as Cars

    const carUpdate = await updateCar(req.body, car.id)

    const dataUpdate = { 
      id: carUpdate.id,
      car_name: carUpdate.car_name,
      type: carUpdate.type,
      img: carUpdate.img,
      seats: carUpdate.seats,
      luggage: parseInt(carUpdate.luggage, 10),
      air_conditioner: carUpdate.air_conditioner,
      transmition: carUpdate.transmition,
      fare_km: parseInt(carUpdate.fare_km, 10),
      driver_id: carUpdate.driver_id,
      created_at: carUpdate.created_at,
      updated_at: carUpdate.updated_at
    }

    res.status(200).json({ message: 'Image was updated sucessfully', dataUpdate})
  } catch ({ message }: any) {
    res.status(400).json({message: 'There was an error updated image', error: message})
  }
}


export const createCarHandler = async (req: AuthRequest, res: Response) => {
  try {
    const { driver_email, car_info } = req.body;
    const { id }: any = await getUserByEmail(driver_email)

    const data = {
      ...car_info,
      driver_id: id,
    };
    const carCreated = await createCar(data)

    res.status(201).json({message: "Car was created successfully", carCreated})

  } catch ({ message}: any ) {
    res.status(400).json({ message });
  } 
}

export async function deleteCarHandler(req: Request, res:Response){
  try {
    const { id } = req.params
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

export async function updateCarHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const car = await getCarById(id);
  
    if (!car) {
      return res.status(404).json({
        message: `Car not found`,
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
  
    res.status(201).json({message: "Information was updated sucessfully", data});
    
  } catch ({ message }: any) {
      res.status(400).json({ message });
  }
}

export const getAllCarsPaginatedHandler = async (req: Request, res: Response) => {
 try {
  const { page: pageQuery, pageSize: pageSizeQuery, searchInput: searchQuery } = req.query
  const page = parseInt(pageQuery as string) || 1
  const pageSize = parseInt(pageSizeQuery as string) || 5
  const searchInput = searchQuery as string || ''; 

  const { cars, totalCount }= await getAllCarsPaginated(page, pageSize, searchInput);

  const totalPages = Math.ceil(totalCount/pageSize);

  if (page > totalPages) {
    throw new Error ('Page not found')
  }

  const newResponse = {
    pageInfo: {
      currentPage: page,
      pageSize,
      totalPages,
      totalCount
    },
    cars
  }

  res.status(200).json({ message: "Cars have been found successfully" , response: newResponse})

  } catch ({ message}: any ) {
    res.status(400).json({ message: "Cars not found" });
  } 
}

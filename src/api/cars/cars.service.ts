import { PrismaClient } from '@prisma/client'

import { Cars } from './cars.types'

const prisma = new PrismaClient()

export const getAllCars = async () => {
  const cars = await prisma.cars.findMany({
    include: {
      driver: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
        }
      }
    }
  })

  return cars
}

export const createCar = async (input: Cars) => {
  const car = await prisma.cars.create({
    data: {
      car_name: input.car_name,
      type: input.type,
      driver_id: input.driver_id,
    }
  })

  return car
}

export const getCarById =async (id: string) => {
  const cars = await prisma.cars.findUnique ({
    where: {
      id,
    },
  });

  return cars;
}

export const getCarByDriverId =async (driver_id: string) => {
  const car = await prisma.cars.findUnique ({
    where: {
      driver_id,
    },
  });

  return car;
}

export async function deleteCar (id: string) {
  const car = await prisma.cars.delete({
    where: {
      id,
    },
  });

  return car;
}

export async function updateCar ( data: any, id: string) {
  const car = await prisma.cars.update({
    where: {
      id,
    },
    data
  });

  return car;
}


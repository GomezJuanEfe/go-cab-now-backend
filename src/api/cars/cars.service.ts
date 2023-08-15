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
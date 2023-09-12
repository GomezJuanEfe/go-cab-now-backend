import { PrismaClient } from '@prisma/client'

import { Cars } from './cars.types'

const prisma = new PrismaClient()

export async function getAllCars() {
  try {
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
    });
    return cars;
  } catch (error: any) {
    throw error;
  }
}

export async function createCar(input: Cars) {
  try {
    const car = await prisma.cars.create({
      data: input
    });

    return car;

  } catch (error: any) {
    throw error;
  }
}

export async function getCarById(id: string) {
  try {
    const cars = await prisma.cars.findUnique({
      where: {
        id,
      },
    });

    return cars;
  } catch (error: any) {
    throw error;
  }
}

export async function getCarByDriverId(driver_id: string) {
  try {
    const car = await prisma.cars.findUnique({
      where: {
        driver_id,
      },
    });

    return car;

  } catch (error: any) {
    throw error;
  }
}

export async function deleteCar(id: string) {
  try {
    const car = await prisma.cars.delete({
      where: {
        id,
      },
    });

    return car;

  } catch (error: any) {
    throw error;
  }
}

export async function updateCar(data: any, id: string) {
  try {

    if (typeof data.luggage === 'string') {
      data.luggage = parseInt(data.luggage, 10);
    }
    if (typeof data.seats === 'string') {
      data.seats = parseInt(data.seats, 10);
    }
    if (typeof data.air_conditioner === 'string') {
      data.air_conditioner = data.air_conditioner.toLowerCase() === 'true';
    }
    if (typeof data.fare_km === 'string') {
      data.fare_km = parseInt(data.fare_km, 10);
    }

    const car = await prisma.cars.update({
      where: {
        id,
      },
      data
    });

    return car;

  } catch (error: any) {
    throw error;
  }
}

export async function getAllCarsPaginated(page: number, pageSize: number, searchQuery: string) {
  try {
    const skip = (page - 1) * pageSize

    const [ cars, totalCount ] = await Promise.all([
      prisma.cars.findMany({
        skip,
        take: pageSize,
        where: {
          OR: [
            {car_name:
              {contains: searchQuery, mode: 'insensitive'}
            },
            {type:
              {contains: searchQuery, mode: 'insensitive'}
            }
          ]
        },
        orderBy: {
          type: "asc"
        }
      }),
      prisma.cars.count({
        where: {
          OR: [
            {car_name:
              {contains: searchQuery, mode: 'insensitive'}
            },
            {type:
              {contains: searchQuery, mode: 'insensitive'}
            }
          ]
        }
      })
    ]);
    return { cars, totalCount };
  } catch (error: any) {
    throw error;
  }
}
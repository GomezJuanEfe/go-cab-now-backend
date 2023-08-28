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


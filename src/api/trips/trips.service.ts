import { PrismaClient } from '@prisma/client';
import { Trip } from './trips.types';

const prisma = new PrismaClient();

export async function createTrip(input: Trip) {
  const trip = await prisma.trips.create({ data: input });

  return trip;
}

export async function getAllTrips() {
  const trips = await prisma.trips.findMany({
    select: {
      id: true,
      user_id: true,
      car_id: true,
      total: true,
      date: true,
      status: true,
      origin_latitude: true,
      destination_latitude: true,
      origin_longitude: true,
      destination_longitude: true,
      distance_km: true,
      Payments: true
    }
  });
  return trips;
}

export async function getTripById(id: string) {
  const trip = await prisma.trips.findUnique({
    where: {
      id,
    }
  });
  return trip
}

export async function getTripsByUserId(user_id: string) {
  const trips = await prisma.trips.findMany({
    where: {
      user_id,
    }, 
    include: {
      user: true,
      car: {
        include: {
          driver: true,
        }
      }
    }
  });

  return trips;
}

export async function getTripByCarId(car_id: string){
  const trips = await prisma.trips.findMany({
    where: {
      car_id,
    }
  });
  return trips
}

export async function updateTrip(data: Trip, id: string){
const trip = await prisma.trips.update({
    where: {
      id,
    },
    data,
  });
  return trip
}

export async function deleteTrip(id: string){
  const trip = await prisma.trips.delete({
    where: {
      id,
    }
  });
  return trip
}

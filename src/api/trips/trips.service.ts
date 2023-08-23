import { PrismaClient } from '@prisma/client';
import { Trip } from './trips.types';

const prisma = new PrismaClient();

export async function createTrip(input: Trip) {

  const trip = await prisma.trips.create({ data: input });

  return trip;
}

export async function getAllTrips() {

  const users = await prisma.trips.findMany({
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
  return users;
}

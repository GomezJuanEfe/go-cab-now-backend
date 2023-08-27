import { User as UserModel, Trips as TripsModel } from '@prisma/client';

export type User = UserModel;

export type UserWithTrips = UserModel & { Trips: TripsModel };
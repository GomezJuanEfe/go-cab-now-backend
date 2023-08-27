-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'DRIVER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Transmition" AS ENUM ('AUTOMATIC', 'MANUAL');

-- CreateEnum
CREATE TYPE "TripStatus" AS ENUM ('UPCOMING', 'PAST', 'CANCELLED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "address" TEXT,
    "phone" TEXT,
    "avatar" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cars" (
    "id" TEXT NOT NULL,
    "car_name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "img" INTEGER,
    "seats" INTEGER,
    "luggage" INTEGER,
    "air_conditioner" BOOLEAN,
    "transmition" "Transmition",
    "fare_km" INTEGER,
    "driver_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trips" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "car_id" TEXT NOT NULL,
    "total" INTEGER,
    "date" TIMESTAMP(3),
    "status" "TripStatus" NOT NULL DEFAULT 'UPCOMING',
    "origin_latitude" INTEGER,
    "destination_latitude" INTEGER,
    "origin_longitude" INTEGER,
    "destination_longitude" INTEGER,
    "distance_km" INTEGER,

    CONSTRAINT "Trips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payments" (
    "id" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "trip_id" TEXT NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cars_driver_id_key" ON "Cars"("driver_id");

-- CreateIndex
CREATE UNIQUE INDEX "Payments_trip_id_key" ON "Payments"("trip_id");

-- AddForeignKey
ALTER TABLE "Cars" ADD CONSTRAINT "Cars_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trips" ADD CONSTRAINT "Trips_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trips" ADD CONSTRAINT "Trips_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "Trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

import { PrismaClient } from "@prisma/client";
import { userSeeder } from "../src/api/user/user.seeders";
import { carsSeeder } from "../src/api/cars/cars.seeder"

const prisma = new PrismaClient();

async function main() {
  // Create many users
  const createUsers = await prisma.user.createMany({
    data: userSeeder,
    skipDuplicates: true,
  })

  // Create cars
  const createCars = await prisma.cars.createMany({
    data: carsSeeder,
    skipDuplicates: true,
  })

  console.log({
    createUsers,
    createCars
  });
}


main()
  .then(() => {
    console.log("Seeding complete.");
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
-- AlterEnum
ALTER TYPE "TripStatus" ADD VALUE 'COMPLETED';

-- AlterTable
ALTER TABLE "Cars" ALTER COLUMN "img" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Trips" ADD COLUMN     "contact_email" TEXT,
ADD COLUMN     "contact_first_name" TEXT,
ADD COLUMN     "contact_last_name" TEXT,
ADD COLUMN     "contact_phone" TEXT,
ADD COLUMN     "contact_request" TEXT,
ALTER COLUMN "origin_latitude" SET DATA TYPE TEXT,
ALTER COLUMN "destination_latitude" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "reset_token" TEXT,
ADD COLUMN     "token_exp" TIMESTAMP(3);

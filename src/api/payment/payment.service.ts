import { PrismaClient } from '@prisma/client';
import { Payments } from './payment.types';

const prisma = new PrismaClient();

export async function createPayment(input: Payments) {
  const payment = await prisma.payments.create({ data: input });

  return payment;
}

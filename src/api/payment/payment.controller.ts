import { Request, Response} from 'express';
import Stripe from 'stripe';
import { createPayment } from './payment.service';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string;
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16',
})

const redirectUrl = process.env.FRONTEND_URL as string;

export const handlePayment = async (req: Request, res: Response) => {
  const { paymentMethod, amount } = req.body

  try {
    const { id } = paymentMethod
    const payment = await stripe.paymentIntents.create({
      payment_method: id,
      amount,
      currency: 'usd',
      confirm: true,
      description: 'trip with Go Cab Now',
      return_url: `${redirectUrl}/success`,
      payment_method_types: [
        "card"
      ],
    })

    res.status(201).json({ message: 'Payment successful', payment })
  } catch(error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const handleCreatePayment = async (req: Request, res: Response) => {
  try{
    const data = req.body;
    const payment = await createPayment(data);

    res.status(202).json({message: 'Payment created successfully', payment});
  } catch({ message }: any){
    res.status(400).json({ message })
  }
}
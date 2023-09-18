import { User } from "../api/user/user.types";
import { Trip } from "../api/trips/trips.types";
import { usdFormat, formatTableDate } from "../services/utils";

const redirectUrl = process.env.FRONTEND_URL as String;

export const verifyAccountEmail = (user: User) => {

  const emailData = {
    from: "No reply <go.cab.now.123@gmail.com>",
    to: user.email,
    subject: "Welcome to the app",
    templateId: "d-e00f95f356e44d58a0944d327e0544d3",
    dynamic_template_data: {
      first_name: user.first_name,
      redirect_url: `${redirectUrl}verify-account/${user.reset_token}`
    }
  }

  return emailData;
}

export const resetPassWordEmail = (user: User) => {

  const emailData = {
    from: "No reply <go.cab.now.123@gmail.com>",
    to: user.email,
    subject: "Reset your password",
    templateId: "d-d8d99b3300604fd68c2241f05cb3299e",
    dynamic_template_data: {
      first_name: user.first_name,
      redirect_url: `${redirectUrl}verify-forgot-password/${user.reset_token}`
    }
  }

  return emailData;
}

export const confirmPaymentEmail = (trip: Trip) => {

  const totalPrice = trip.total as number;
  const tripDate = trip.date as Date;

  const emailData = {
    from: "No reply <go.cab.now.123@gmail.com>",
    to: trip.contact_email as string,
    subject: "Payment Bill Go Cab Now",
    templateId: "d-17eec0c0538d4470bf0b88781a45aff2",
    dynamic_template_data: {
      first_name: trip.contact_first_name,
      last_name: trip.contact_last_name,
      origin: trip.origin_latitude,
      destination: trip.destination_latitude,
      price: usdFormat(totalPrice),
      date: formatTableDate(tripDate),
      redirect_url: `${redirectUrl}success`
    }
  }

  return emailData;
}

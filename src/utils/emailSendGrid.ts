import { User } from "../api/user/user.types"

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

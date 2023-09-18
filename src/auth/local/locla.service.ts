import { signToken } from "../auth.service";

export const createAuthResponse = (input: any) => {
      const payload = {
      id: input.id,
      email: input.email,
    }
    const token = signToken(payload)

    const profile = {
      firstName: input.first_name,
      lastName: input.last_name,
      email: input.email,
      avatar: input.avatar,
      role: input.role,
    }

  return { token, profile }
}
import { Request, Response } from 'express';

import { getUserByEmail, getUserByResetToken, updateUser } from '../../api/user/user.service';
import { comparePassword } from '../utils/bcrypt';
import { createAuthResponse } from '../local/locla.service'
import { User } from '@prisma/client';
import { sendMailSendGrid } from '../../config/sendGrid';
import { resetPassWordEmail } from '../../utils/emailSendGrid';

export async function loginHandler(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    if(!user) {
      return res.status(401).send('Invalid credentials');
    }

    if (!user.is_active) {
      return res.status(400).send('User inactive. Verify your email first');
    }

    // Compare password
    const isMatch = await comparePassword(password, user.password)

    if(!isMatch) {
      return res.status(401).send('Invalid credentials');
    }

    const { token, profile } = createAuthResponse(user);

    return res.status(200).json({ token, profile });

  } catch({ message }: any) {
    res.status(400).json({ message })
  }
}

export async function activeAccountHandler(req: Request, res: Response) {
  try {
    const { token: tokenFromParams } = req.params;

    const user = await getUserByResetToken(tokenFromParams);

    if (!user) {
      return res.status(404).json({ message: 'Invalid token'});
    }

    if (user.token_exp && Date.now() > user.token_exp.getTime()) {
      return res.status(400).json({ message: 'Token expired'});
    }

    const data = {
      is_active: true,
      reset_token: null,
      token_exp: null, 
    }

    const currentUser = await updateUser(data, user.id);

    const { token, profile } = createAuthResponse(currentUser);

    res.status(200).json({ token, profile });
  } catch ({ message }: any) {
    res.status(400).json({ message })
  }
}

export async function generateTokenForgotPassword(req: Request, res: Response) {
  try {
    const { email } = req.params;

    const { id } = await getUserByEmail(email) as User;

    if (!id) {
      return res.status(404).json({ message: 'No user found'});
    }

    const user = await updateUser({email}, id, true) as User;

    sendMailSendGrid(resetPassWordEmail(user));

    res.status(200).json({ message: 'Your request has been processed, please verify your email' })
  } catch ({ message }: any) {

    res.status(400).json({ message })
  }
}

export async function checkTokenForgotPassword(req: Request, res: Response) {
  try {
    const { token: tokenFromParams } = req.params;

    const user = await getUserByResetToken(tokenFromParams);

    if (!user) {
      return res.status(404).json({ message: 'Invalid token'});
    }

    res.status(200).json({ message: 'Token verified' })
  } catch ({message}: any) {
    res.status(400).json({ message })
  }
}

export async function resetPassword(req: Request, res: Response) {
  try {

    const { token: tokenFromParams } = req.params;
    let { password } = req.body;

    const user = await getUserByResetToken(tokenFromParams);

    if (!user) {
      return res.status(404).json({ message: 'Invalid token'});
    }

    if (user.token_exp && Date.now() > user.token_exp.getTime()) {
      return res.status(400).json({ message: 'Token expired'});
    }

    const data = {
      password,
      reset_token: null,
      token_exp: null
    }

    await updateUser(data, user.id)

    res.status(200).json({ message: 'Password changed' })
  } catch ({message}: any) {
    res.status(400).json({ message })
  }
}

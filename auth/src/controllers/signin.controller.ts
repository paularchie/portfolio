import { User } from '@supreme-tech/common';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { signin } from '../services/signin.service';

export const signinController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  const existingUser: User = await signin({ email, password });

  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email
    },
    process.env.JWT_KEY
  );

  // Store it on session object
  req.session = {
    jwt: userJwt
  };

  res.status(200).send(existingUser);
};

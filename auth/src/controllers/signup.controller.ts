import { User } from '@supreme-tech/common';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { signup } from '../services/signup.service';

export const signupController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  const newUser: User = await signup({ email, password });
  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: newUser.id,
      email: newUser.email
    },
    process.env.JWT_KEY
  );

  // Store it on session object
  req.session = {
    jwt: userJwt
  };

  res.status(201).send(newUser);
};

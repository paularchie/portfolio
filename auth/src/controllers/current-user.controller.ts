import { Request, Response } from 'express';
import { getCurrentUser } from '../services/current-user.service';

export const currentUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.status(201).send({
    currentUser: await getCurrentUser(req.currentUser)
  });
};

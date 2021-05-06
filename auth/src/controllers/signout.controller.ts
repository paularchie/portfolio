import { Request, Response } from 'express';

export const signoutController = async (
  req: Request,
  res: Response
): Promise<void> => {
  req.session = null;

  res.send({});
};

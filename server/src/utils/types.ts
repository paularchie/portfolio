import { Request, Response } from 'express';
import { PrismaClient, Role } from '../../../common/build';

export interface Context {
  prisma: PrismaClient;
  req: Request;
  res: Response;
  currentUser: { id: string; role: Role };
}

export type TupleUnion<U extends string, R extends string[] = []> = {
  [S in U]: Exclude<U, S> extends never ? [...R, S] : TupleUnion<Exclude<U, S>, [...R, S]>;
}[U] &
  string[];

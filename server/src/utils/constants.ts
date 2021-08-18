import { TupleUnion } from './types';
import { User } from '@portfolio/common';

export const USER_FIELDS: TupleUnion<keyof User> = ['id', 'email', 'role'];

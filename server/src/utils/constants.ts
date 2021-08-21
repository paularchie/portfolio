import { TupleUnion } from './types';
import { User } from '@portfolio/common/build/types';

export const USER_FIELDS: TupleUnion<keyof User> = ['id', 'email', 'role'];

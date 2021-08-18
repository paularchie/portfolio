import { Models } from '@portfolio/common';
import { Mutation } from './Mutations';
import { Query } from './Queries';

const types = {
  ...Models,
  Query,
  Mutation
};

export default types;

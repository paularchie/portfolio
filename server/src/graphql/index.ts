import * as Models from '@portfolio/common/build/models';
import { Mutation } from './Mutations';
import { Query } from './Queries';

const types = {
  ...Models,
  Query,
  Mutation
};

export default types;

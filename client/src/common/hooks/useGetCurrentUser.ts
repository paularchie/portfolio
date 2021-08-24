import { useQuery } from 'react-query';
import client from '../utils/client';
import { getUserQuery } from '@portfolio/common/build/graphql/queries';
import { User } from '@portfolio/common/build/types';

export const useGetCurrentUser = () => {
  return useQuery('getCurrentUser', async (): Promise<User> => {
    const res = await client.request(getUserQuery);
    return res.getUser;
  });
};

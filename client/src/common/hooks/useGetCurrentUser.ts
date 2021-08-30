import { useQuery } from 'react-query';
import client from '../utils/client';
import { getUserQuery } from '@portfolio/common/build/graphql/queries';
import { User } from '@portfolio/common/build/types';
import { CURRENT_USER } from '../utils/query-keys';

export const useGetCurrentUser = () => {
  return useQuery(CURRENT_USER, async (): Promise<User> => {
    const res = await client.request(getUserQuery);
    return res.getUser;
  });
};

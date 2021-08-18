import { useQuery } from 'react-query';
import client from '../utils/client';
import queries from '../../graphql/Query';

export const useGetCurrentUser = () => {
  return useQuery<any, any>('getCurrentUser', async () => {
    const res = await client.request(queries.getUserQuery);
    return res.getUser;
  });
};

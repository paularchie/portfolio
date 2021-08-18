import { useQuery } from 'react-query';
import { useRequest } from '../utils/client';
import queries from '../../graphql/Query';
import { UserLoginInput, User } from '@portfolio/common';

export const useSignIn = (credentials: UserLoginInput) => {
  const { request } = useRequest();
  return useQuery<User, Error>('signIn', () => request(queries.loginQuery, { data: credentials }), {
    enabled: false,
    retry: false
  });
};

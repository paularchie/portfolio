import { useQuery } from 'react-query';
import { useRequest } from '../utils/client';
import queries from '../../graphql/Query';
import { LoginCredentials } from '../../modules/auth/auth-types';

export type User = {
  id: string;
  username: string;
  email: string;
};

export const useSignIn = (credentials: LoginCredentials) => {
  const { request } = useRequest();
  return useQuery<User, Error>(
    'signIn',
    () => request(queries.loginQuery, { data: credentials }),
    {
      enabled: false,
      retry: false
    }
  );
};

import { useMutation, useQuery } from 'react-query';
import { useRequest } from '../utils/client';
import queries from '../../graphql/Query';
import { LoginCredentials, SignUpPayload } from '../../modules/auth/auth-types';

export type User = {
  id: string;
  username: string;
  email: string;
};

export const useSignUp = () => {
  const { request } = useRequest();
  return useMutation<User, Error>(async (data: any) => {
    const res = await request(queries.signUpMutation, { data });
    return res.signUp;
  });
};

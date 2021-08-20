import { useMutation } from 'react-query';
import { useRequest } from '../utils/client';
import queries from '../../graphql/Query';
import { UserLoginInput, LoginResult } from '@portfolio/common';

export const useSignIn = () => {
  const { request } = useRequest();
  return useMutation<LoginResult, Error>(async (data: UserLoginInput) => {
    const res = await request(queries.loginQuery, { data });
    return res.login;
  });
};

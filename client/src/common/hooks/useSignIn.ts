import { useRequest } from '../utils/client';
import queries from '../../graphql/Query';
import { UserLoginInput, LoginResult } from '@portfolio/common/build/types';
import { useMutation } from 'react-query';

export const useSignIn = () => {
  const { request } = useRequest();
  return useMutation(async (data: UserLoginInput): Promise<LoginResult> => {
    const res = await request(queries.loginQuery, { data });
    return res.login;
  });
};

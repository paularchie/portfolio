import { useRequest } from '../utils/client';
import { UserLoginInput, LoginResult } from '@portfolio/common/build/types';
import { loginQuery } from '@portfolio/common/build/graphql/queries';
import { useMutation } from 'react-query';

export const useSignIn = () => {
  const { request } = useRequest();
  return useMutation(async (data: UserLoginInput): Promise<LoginResult> => {
    const res = await request(loginQuery, { data });
    return res.login;
  });
};

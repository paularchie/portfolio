import { useMutation } from 'react-query';
import { useRequest } from '../utils/client';
import { SignUpResult, UserSignUpInput } from '@portfolio/common/build/types';
import { signUpMutation } from '@portfolio/common/build/graphql/mutations';

export const useSignUp = () => {
  const { request } = useRequest();
  return useMutation(async (data: UserSignUpInput): Promise<SignUpResult> => {
    const res = await request(signUpMutation, { data });
    return res.signUp;
  });
};

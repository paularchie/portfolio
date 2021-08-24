import { GraphQLError } from '@portfolio/common/build/types';

export const returnsError = async (callback: () => Promise<void>, error: GraphQLError) => {
  try {
    await callback();
    throw new Error('should not reach this line');
  } catch ({ response: { errors } }) {
    expect(errors.length).toEqual(1);
    expect(errors[0].message).toEqual(error.message);
    expect(errors[0].extensions.code).toEqual(error.code);
  }
};

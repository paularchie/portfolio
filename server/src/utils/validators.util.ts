import { isEmail, validatePassword } from '@portfolio/common/build/utils';
import { UserSignUpInput, ValidationError, User } from '@portfolio/common/build/types';

export const validateSignUpInput = async (data: UserSignUpInput, existingUser: User | null): Promise<ValidationError[]> => {
  const errors: ValidationError[] = [];

  if (!isEmail(data.email)) {
    errors.push({
      message: 'Invalid email address',
      field: 'email'
    });
  }

  const passwordErrors = validatePassword(data.password);
  if (passwordErrors.length) {
    errors.push({
      message: 'Password too weak',
      field: 'password',
      errorTypes: passwordErrors
    });
  }

  if (existingUser) {
    errors.push({
      message: 'Email already in use',
      field: 'email'
    });
  }

  return errors;
};

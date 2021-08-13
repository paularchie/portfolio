import validator from 'validator';
import PasswordValidator from 'password-validator';

const schema = new PasswordValidator();

// prettier-ignore
schema
    .is().min(8)                                   
    .has().uppercase()                            
    .has().lowercase()                              
    .has().digits()                                 
    .has().not().spaces()                          
    .is().not().oneOf(['Password123']);

export function validatePassword(password: string) {
  return schema.validate(password, { list: true });
}

export const isEmail = validator.isEmail;

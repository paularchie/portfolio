import express from 'express';

import {
  currentUser,
  requireAuth,
  validateRequest
} from '@supreme-tech/common';
import { signupController } from './controllers/signup.controller';
import { signinValidators, signupValidators } from './utils/validators.util';
import { currentUserController } from './controllers/current-user.controller';
import { signoutController } from './controllers/signout.controller';
import { signinController } from './controllers/signin.controller';

const router = express.Router();

router.post('/signup', signupValidators, validateRequest, signupController);
router.post('/signin', signinValidators, validateRequest, signinController);
router.post('/signout', requireAuth, signoutController);
router.get('/current-user', currentUser, currentUserController);

export { router as usersRouter };

const userAuthRouter = require('express').Router();

const { signIn } = require('../services/auth/signInServices');
const { signUp } = require('../services/auth/signUpServices');
const { response } = require('../utils/responses');
const { inputs } = require('../middlewares/authMiddleware');

userAuthRouter.post('/signin', inputs.signIn(), async (req, res) => {
  try {
    const result = await signIn.signIn(req);
    response.success(res, "You've signed in successfully", result);
  } catch (error) {
    response.error(res, error.message);
  }
});

userAuthRouter.post('/signup', inputs.signUp(), async (req, res) => {
  try {
    const result = await signUp.signUp(req.body);
    response.success(res, result || 'User account created successfully', null);
  } catch (error) {
    response.error(res, error.message);
  }
});

module.exports = userAuthRouter;

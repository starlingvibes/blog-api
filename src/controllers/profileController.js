const userProfileRouter = require('express').Router();
const { response } = require('../utils/responses');
const { profile } = require('../services/profile/profileServices');
const processUploadedFile = require('../middlewares/processFileMiddleware');

userProfileRouter.get('/', async (req, res) => {
  try {
    const result = await profile.fetchProfile(req);
    response.success(res, 'Profile fetched successfully', result);
  } catch (error) {
    response.error(res, error.message);
  }
});

// userProfileRouter.put('/', async (req, res) => {
//   try {
//     await processUploadedFile(req, res);
//     await profile.updateProfile(req);
//     response.success(res, 'Profile updated successfully', null);
//   } catch (error) {
//     response.error(res, error.message);
//   }
// });

userProfileRouter.delete('/', async (req, res) => {
  try {
    await profile.deleteAccount(req);
    response.success(res, 'Account deleted successfully', null);
  } catch (error) {
    response.error(res, error.message);
  }
});

module.exports = userProfileRouter;

const { query } = require('./queryServices');
const { jwt } = require('../../utils/jwt');
const { helper } = require('../../utils/helpers');
const { cloudinary } = require('../../utils/storage/cloudinary');

class ProfileServices {
  updateProfile = async (req) => {
    try {
      let result;

      if (req.file) {
        result = await cloudinary.uploadProfileImageToCloudinary(req.file);
      }

      const token = await helper.extractToken(req);
      const adminId = await jwt.authUser(token);
      const user = await query.accessUser(adminId);
      if (!user) {
        throw new Error('User not found');
      }
      if (result !== undefined) {
        await query.updateProfile(adminId, req.body, result.secure_url);
      } else {
        await query.updateProfile(adminId, req.body, user.profileImage);
      }
    } catch (error) {
      throw error;
    }
  };

  fetchProfile = async (req) => {
    try {
      const token = await helper.extractToken(req);
      const userId = await jwt.authUser(token);
      const user = await query.accessUser(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return await query.fetchProfile(userId);
    } catch (error) {
      throw error;
    }
  };

  deleteAccount = async (req) => {
    try {
      const token = await helper.extractToken(req);
      const adminId = await jwt.authUser(token);
      const user = await query.accessUser(adminId);
      if (!user) {
        throw new Error('User not found');
      }
      await query.deleteAccount(adminId);
    } catch (error) {
      throw error;
    }
  };
}

exports.profile = new ProfileServices();

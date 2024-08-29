const { User, Security } = require('../../database/models');

class QueryServices {
  accessUser = async (userId) => {
    try {
      return await User.findOne({ where: { userId } });
    } catch (error) {
      throw error;
    }
  };

  updateProfile = async (userId, profile, imageUrl) => {
    try {
      const user = await this.accessUser(userId);

      user.firstName = profile.firstName || user.firstName;
      user.lastName = profile.lastName || user.lastName;
      user.profileImage = imageUrl || user.profileImage;

      await user.save();
    } catch (error) {
      throw error;
    }
  };

  fetchProfile = async (userId) => {
    try {
      const user = await User.findOne({ where: { userId } });
      return user;
    } catch (error) {
      throw error;
    }
  };

  deleteAccount = async (userId) => {
    try {
      await Security.destroy({ where: { userId } });
      await User.destroy({ where: { userId } });
    } catch (error) {
      return error;
    }
  };
}

exports.query = new QueryServices();

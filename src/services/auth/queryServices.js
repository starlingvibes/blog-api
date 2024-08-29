const { User, Security } = require('../../database/models');
const { encrypt } = require('../../utils/encryption');

class QueryServices {
  createUser = async (data, userId) => {
    try {
      return await User.create({
        ...data,
        email: data.email.toLowerCase(),
        userId,
      });
    } catch (error) {
      throw error;
    }
  };

  updateTables = async (userId, password) => {
    try {
      await Security.create({
        userId,
        password,
      });
    } catch (error) {
      throw error;
    }
  };

  updateAccount = async (userId, data, email, password) => {
    try {
      await User.update({ ...data, email }, { where: { userId } });
      await Security.update({ password }, { where: { userId } });
    } catch (error) {
      throw error;
    }
  };

  accessUser = async (email) => {
    try {
      return await User.findOne({
        where: { email },
      });
    } catch (error) {
      throw error;
    }
  };

  accessUserById = async (userId) => {
    try {
      return await User.findOne({
        where: { userId },
      });
    } catch (error) {
      throw error;
    }
  };

  securityCheck = async (userId) => {
    try {
      return await Security.findOne({
        where: { userId },
      });
    } catch (error) {
      throw error;
    }
  };

  updateUser = async (verifyStatus, userId) => {
    try {
      await User.update({ verifyStatus }, { where: { userId } });
    } catch (error) {
      throw error;
    }
  };
}

exports.query = new QueryServices();

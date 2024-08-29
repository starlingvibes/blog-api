require('dotenv').config();
const { query } = require('./utilsQueries');
const { helper } = require('../utils/helpers');

class Jwt {
  createUser = async (userId) => {
    try {
      return await helper.generateJwt(userId);
    } catch (error) {
      throw error;
    }
  };

  authUser = async (token) => {
    try {
      if (!token || token == null) {
        throw new Error('invalidToken');
      }

      const userId = await helper.verifyJwt(token).data;

      if (!userId) {
        throw new Error('invalidToken');
      }

      const user = await query.getUser(userId);
      if (!user) {
        throw new Error('User not found');
      }
      if (!user?.isAccountActive) {
        throw new Error('Access denied, please contact support');
      }

      return user;
    } catch (error) {
      throw error;
    }
  };

  authAdmin = async (token) => {
    try {
      if (!token || token == null) {
        throw new Error('invalidToken');
      }

      const adminId = await helper.verifyJwt(token).data;

      if (!adminId) {
        throw new Error('invalidToken');
      }

      const admin = await query.getUser(adminId);
      if (!admin?.isAccountActive) {
        throw new Error('Access denied, please contact support');
      }
      if (!admin?.isAdmin) {
        throw new Error('Unauthorized access');
      }

      return adminId;
    } catch (error) {
      throw error;
    }
  };
}

exports.jwt = new Jwt();

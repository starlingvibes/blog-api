const { User } = require('../database/models');

class Queries {
  getUser = async (userId) => {
    try {
      return await User.findOne({
        where: { userId },
      });
    } catch (error) {
      throw error;
    }
  };
}

exports.query = new Queries();

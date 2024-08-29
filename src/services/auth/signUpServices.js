const { query } = require('./queryServices');
const { helper } = require('../../utils/helpers');
const { encrypt } = require('../../utils/encryption');

class SignUpServices {
  signUp = async (data) => {
    try {
      const user = await query.accessUser(data.email.toLowerCase());

      const hashedPassword = await encrypt.hashInput(data.password);

      if (!user) {
        const userId = await helper.generateUuid();
        const newUser = await query.createUser(data, userId);
        await query.updateTables(userId, hashedPassword);

        return;
      }

      throw new Error('Email address already exists');
    } catch (error) {
      throw error;
    }
  };
}

exports.signUp = new SignUpServices();

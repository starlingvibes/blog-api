const { query } = require('./queryServices');
const { encrypt } = require('../../utils/encryption');
const { jwt } = require('../../utils/jwt');
const { helper } = require('../../utils/helpers');

class SignInServices {
  signIn = async (req) => {
    try {
      const user = await query.accessUser(req.body.email.toLowerCase());

      if (!user) {
        throw new Error('Incorrect email or password');
      }

      if (!user?.isAccountActive) {
        throw new Error('Access denied, please contact support');
      }

      const hashed = await query.securityCheck(user.userId);

      if (await encrypt.verifyInput(req.body.password, hashed.password)) {
        return {
          token: await jwt.createUser(user.userId),
        };
      }

      throw new Error('Incorrect email or password');
    } catch (error) {
      throw error;
    }
  };
}

exports.signIn = new SignInServices();

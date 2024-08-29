require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { query } = require('./utilsQueries');
const sha512 = require('js-sha512').sha512;

class Helper {
  extractToken = async (req) => {
    if (!req.headers?.authorization) {
      throw new Error('invalidToken');
    }
    const token = req.headers.authorization.split(' ')[1];
    return token;
  };

  extractAdminToken = async (req) => {
    if (!req.headers['x-admin-token']) {
      return null;
    }
    return req.headers['x-admin-token'];
  };

  generateId = async (data) => {
    const digits = '0123456789';
    let randomNo = '';
    for (let i = 0; i < 5; i++) {
      randomNo += digits[Math.floor(Math.random() * 10)];
    }
    return randomNo + data;
  };

  generateOtp = () => {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    const otpExpiry = Date.now() + 1000 * 60 * 60;

    return { otp, otpExpiry };
  };

  generateJwt = (Id) => {
    const digits = '0123456789';
    let randomCode = '';
    for (let i = 0; i < 10; i++) {
      randomCode += digits[Math.floor(Math.random() * 10)];
    }

    return jsonwebtoken.sign(
      {
        data: Id,
        id: randomCode,
      },
      process.env.JWT_KEY
    );
  };

  verifyJwt = (token) => {
    try {
      return jsonwebtoken.verify(token, process.env.JWT_KEY);
    } catch (error) {
      throw error;
    }
  };

  expireOtp = Date.now() - 86400000;

  generateUuid = async () => {
    return uuidv4();
  };

  convertToTitleCase = async (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  validatePassword = async (password) => {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$/;

    if (!passwordRegex.test(password)) {
      throw new Error(
        'Invalid password. It must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long.'
      );
    }
  };
}

exports.helper = new Helper();

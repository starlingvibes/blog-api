const bcrypt = require("bcrypt");
class Encryption {
  hashInput = async (data) => {
    try {
      const hashed = await bcrypt.hash(data.toString(), 10);
      return hashed;
    } catch (error) {
      throw error;
    }
  };

  verifyInput = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  };
}

exports.encrypt = new Encryption();

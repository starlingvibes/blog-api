'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Security extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Security.init(
    {
      securityId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      otp: {
        type: DataTypes.INTEGER,
      },
      otpExpiry: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Password is required' },
          notEmpty: { msg: "Password can't be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: 'Security',
      tableName: 'securities',
      paranoid: true,
    }
  );
  return Security;
};

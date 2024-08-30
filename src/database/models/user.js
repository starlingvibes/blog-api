'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ EmployeeOrganization }) {
      // define associations here
      this.hasMany(EmployeeOrganization, {
        foreignKey: 'userId',
        as: 'employer',
      });
    }

    toJSON() {
      return {
        ...this.get(),
        // id: undefined,
        // clearTime: undefined,
        updatedAt: undefined,
      };
    }
  }

  User.init(
    {
      userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Email address required' },
          notEmpty: { msg: "Email can't be empty" },
          isEmail: { msg: 'Invalid email address' },
        },
      },
      profileImage: {
        type: DataTypes.STRING,
        defaultValue:
          'https://res.cloudinary.com/taliot/image/upload/v1697199168/assets/landing_page/rbcmrygjs9edq5qbnh9p.png',
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isAccountActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
    }
  );
  return User;
};

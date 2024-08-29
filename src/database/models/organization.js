'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define associations here
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

  Organization.init(
    {
      organizationId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tagline: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      websiteUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Organization',
      tableName: 'organizations',
      paranoid: true,
    }
  );
  return Organization;
};

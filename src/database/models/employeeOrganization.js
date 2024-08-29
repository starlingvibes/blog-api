'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EmployeeOrganization extends Model {
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

  EmployeeOrganization.init(
    {
      employeeOrganizationId: {
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
      organizationId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'EmployeeOrganization',
      tableName: 'employeeOrganizations',
      paranoid: true,
    }
  );
  return EmployeeOrganization;
};

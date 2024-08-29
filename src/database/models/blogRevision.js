'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BlogRevision extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ BlogContent }) {
      // define associations here
      this.belongsTo(BlogContent, {
        foreignKey: 'blogContentId',
        as: 'blogContent',
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

  BlogRevision.init(
    {
      blogRevisionId: {
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
      blogId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      blogContentId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      coverImage: {
        type: DataTypes.STRING,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: ['pending', 'approved', 'rejected'],
        defaultValue: 'pending',
      },
      revisionType: {
        type: DataTypes.ENUM,
        values: ['CREATE', 'UPDATE', 'DELETE'],
        allowNull: false,
      },
      revisionDate: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'BlogRevision',
      tableName: 'blogRevisions',
      paranoid: true,
    }
  );
  return BlogRevision;
};

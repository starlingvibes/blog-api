'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ BlogContent, User }) {
      // define associations here
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' });
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

  Blog.init(
    {
      blogId: {
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
      isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Blog',
      tableName: 'blogs',
      paranoid: true,
    }
  );
  return Blog;
};

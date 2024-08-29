const { User, Security, Blog, BlogContent } = require('../../database/models');
const { Op } = require('sequelize');

class QueryServices {
  accessUser = async (userId) => {
    try {
      return await User.findOne({ where: { userId } });
    } catch (error) {
      throw error;
    }
  };

  accessUserWithEmail = async (email) => {
    try {
      return await User.findOne({ where: { email } });
    } catch (error) {
      throw error;
    }
  };

  securityCheck = async (userId) => {
    try {
      return await Security.findOne({
        where: { userId },
      });
    } catch (error) {
      throw error;
    }
  };

  fetchBlogs = async (query) => {
    try {
      let { page = 1, limit = 10, title, q } = query;

      page = parseInt(page, 10);
      limit = parseInt(limit, 10);

      let where = {};

      if (title) where = { ...where, title: { [Op.like]: `%${title}%` } };

      if (q)
        where = {
          ...where,
          [Op.or]: [{ name: { [Op.like]: `%${q}%` } }],
        };

      const { count, rows } = await Blog.findAndCountAll({
        where,
        offset: (page - 1) * limit,
        limit,
        include: [
          {
            model: BlogContent,
            as: 'blogContent',
            attributes: ['html', 'markdown'],
          },
        ],
      });

      return {
        total: count,
        items: rows,
        page,
        lastPage: Math.ceil(count / limit),
      };
    } catch (error) {
      throw error;
    }
  };

  fetchBlog = async (blogId) => {
    try {
      const blog = await Blog.findOne({
        where: { blogId },
        include: [
          {
            model: BlogContent,
            as: 'blogContent',
            attributes: ['html', 'markdown'],
          },
        ],
      });
      return blog;
    } catch (error) {
      throw error;
    }
  };

  createBlog = async (data) => {
    try {
      return await Blog.create({ ...data });
    } catch (error) {
      throw error;
    }
  };

  updateBlog = async (blogId, newData) => {
    try {
      const blog = await Blog.findOne({
        where: { blogId },
      });
      if (!blog) {
        throw new Error('Blog not found');
      }
      await blog.update({ ...newData });
      return blog;
    } catch (error) {
      throw error;
    }
  };

  deleteBlog = async (blogId) => {
    try {
      return await Blog.destroy({ where: { blogId } });
    } catch (error) {
      throw error;
    }
  };
}

exports.query = new QueryServices();

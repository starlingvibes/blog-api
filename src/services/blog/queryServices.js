const {
  User,
  Security,
  Blog,
  BlogContent,
  BlogRevision,
  EmployeeOrganization,
} = require('../../database/models');
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

  isUserAnEmployee = async (userId) => {
    try {
      const record = await EmployeeOrganization.findOne({
        where: { userId },
      });

      return !!record;
    } catch (error) {
      throw error;
    }
  };

  fetchBlogs = async (query) => {
    try {
      let { page = 1, limit = 10, title, q } = query;

      page = parseInt(page, 10);
      limit = parseInt(limit, 10);

      let where = { isPublished: true };

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
        page,
        lastPage: Math.ceil(count / limit),
        items: rows,
      };
    } catch (error) {
      throw error;
    }
  };

  fetchBlogRevisions = async (query) => {
    try {
      let { page = 1, limit = 10, status, q } = query;

      page = parseInt(page, 10);
      limit = parseInt(limit, 10);

      let where = {};

      if (status) where = { ...where, status };

      if (q)
        where = {
          ...where,
          [Op.or]: [{ name: { [Op.like]: `%${q}%` } }],
        };

      const { count, rows } = await BlogRevision.findAndCountAll({
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
        page,
        lastPage: Math.ceil(count / limit),
        items: rows,
      };
    } catch (error) {
      throw error;
    }
  };

  fetchBlogByIDOrSlug = async (query) => {
    try {
      const blog = await Blog.findOne({
        query,
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

  createBlog = async (userId, data) => {
    try {
      const blogContent = await BlogContent.create({
        html: data.html,
        markdown: data.markdown,
      });
      return await Blog.create({
        ...data,
        userId,
        blogContentId: blogContent.blogContentId,
        isApproved: true,
        isPublished: true,
      });
    } catch (error) {
      throw error;
    }
  };

  createPendingBlog = async (userId, blogId, data) => {
    try {
      const blogContent = await BlogContent.create({
        html: data.html,
        markdown: data.markdown,
      });
      return await BlogRevision.create({
        ...data,
        userId,
        blogId,
        blogContentId: blogContent.blogContentId,
        revisionType: 'CREATE',
      });
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

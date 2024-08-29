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

  fetchBlogRevision = async (blogRevisionId) => {
    try {
      const blog = await BlogRevision.findOne({
        where: { blogRevisionId },
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

  fetchBlogContent = async (blogContentId) => {
    try {
      const blogContent = await BlogContent.findOne({
        where: { blogContentId },
      });
      return blogContent;
    } catch (error) {
      throw error;
    }
  };

  rejectBlogRevision = async (blogRevision) => {
    try {
      return await blogRevision.update({
        status: 'rejected',
        revisionDate: new Date(),
      });
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
        isPublished: true,
      });
    } catch (error) {
      throw error;
    }
  };

  createBlogAndApproveRevision = async (blogRevision) => {
    try {
      const { userId, blogContentId, title, description, coverImage, slug } =
        blogRevision;

      await blogRevision.update({
        status: 'approved',
        revisionDate: new Date(),
      });
      return await Blog.create({
        userId,
        blogContentId,
        title,
        description,
        slug,
        coverImage,
        isPublished: true,
      });
    } catch (error) {
      throw error;
    }
  };

  updateBlogAndApproveRevision = async (blogRevision) => {
    try {
      const { userId, blogContentId, title, description, coverImage, slug } =
        blogRevision;

      await blogRevision.update({
        status: 'approved',
        revisionDate: new Date(),
      });
      return await Blog.create({
        userId,
        blogContentId,
        title,
        description,
        slug,
        coverImage,
        isPublished: true,
      });
    } catch (error) {
      throw error;
    }
  };

  deleteBlogAndApproveRevision = async (blogRevision) => {
    try {
      await blogRevision.update({
        status: 'approved',
        revisionDate: new Date(),
      });
      await Blog.destroy({
        where: {
          blogId: blogRevision.blogId,
        },
      });
      return blogRevision;
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

      const blogContent = await BlogContent.findOne({
        where: { blogContentId: blog.blogContentId },
      });
      if (!blogContent) {
        throw new Error('Blog content not found');
      }
      const oldBlogContentHtml = blogContent.html;
      const oldBlogContentMarkdown = blogContent.markdown;

      await blog.update({
        ...newData,
        title: newData.title ? newData.title : blog.title,
        description: newData.description
          ? newData.description
          : blog.description,
        coverImage: newData.coverImage ? newData.coverImage : blog.coverImage,
        slug: newData.slug ? newData.slug : blog.slug,
      });
      await blogContent.update({
        html: newData.html ? newData.html : oldBlogContentHtml,
        markdown: newData.markdown ? newData.markdown : oldBlogContentMarkdown,
      });
      return blog;
    } catch (error) {
      throw error;
    }
  };

  updatePendingBlog = async (
    userId,
    blogId,
    blog,
    originalBlogContent,
    newData
  ) => {
    try {
      const blogContent = await BlogContent.create({
        html: newData.html ? newData.html : originalBlogContent.html,
        markdown: newData.markdown
          ? newData.markdown
          : originalBlogContent.markdown,
      });
      return await BlogRevision.create({
        ...newData,
        userId,
        blogId,
        blogContentId: blogContent.blogContentId,
        title: newData.title ? newData.title : blog.title,
        description: newData.description
          ? newData.description
          : blog.description,
        coverImage: newData.coverImage ? newData.coverImage : blog.coverImage,
        slug: newData.slug ? newData.slug : blog.slug,
        revisionType: 'UPDATE',
      });
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

  deletePendingBlog = async (userId, blogId, data) => {
    try {
      const { title, description, coverImage, slug, blogContentId } = data;
      return await BlogRevision.create({
        userId,
        blogId,
        blogContentId,
        title,
        description,
        slug,
        coverImage,
        revisionType: 'DELETE',
      });
      /// NOTE: creating this record for blog deletes not the best, but works for now
    } catch (error) {
      throw error;
    }
  };
}

exports.query = new QueryServices();

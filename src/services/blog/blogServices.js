const { query } = require('./queryServices');
const { jwt } = require('../../utils/jwt');
const { helper } = require('../../utils/helpers');

class BlogServices {
  fetchAllBlogs = async (req) => {
    try {
      return await query.fetchBlogs(req.query);
    } catch (error) {
      throw error;
    }
  };

  fetchAllBlogRevisions = async (req) => {
    try {
      const token = await helper.extractToken(req);
      await jwt.authAdmin(token);

      return await query.fetchBlogRevisions(req.query);
    } catch (error) {
      throw error;
    }
  };

  fetchSingleBlogByIDOrSlug = async (req) => {
    try {
      const blogIdOrSlug = req.params.blogIdOrSlug;
      let queryParam;

      if (helper.validateUuid(blogIdOrSlug)) {
        queryParam = { where: { blogId: blogIdOrSlug } };
      } else {
        queryParam = { where: { slug: blogIdOrSlug } };
      }

      const data = await query.fetchBlogByIDOrSlug(queryParam);
      if (!data) {
        return [];
      }
      return data;
    } catch (error) {
      throw error;
    }
  };

  createBlog = async (req) => {
    try {
      const token = await helper.extractToken(req);
      const user = await jwt.authUser(token);

      const slug = helper.slugify(req.body.title);
      req.body.slug = slug;

      const userIsAnEmployee = await query.isUserAnEmployee(user.userId);
      if (!userIsAnEmployee && !user.isAdmin) {
        const blogId = await helper.generateUuid();
        return await query.createPendingBlog(user.userId, blogId, req.body);
      }

      return await query.createBlog(user.userId, req.body);
    } catch (error) {
      throw error;
    }
  };

  evaluateBlogRevision = async (req) => {
    try {
      const token = await helper.extractToken(req);
      await jwt.authAdmin(token);

      const { blogRevisionId, action } = req.body;

      const blogRevision = await query.fetchBlogRevision(blogRevisionId);
      if (!blogRevision || blogRevision.status !== 'pending') {
        throw new Error('Blog revision not found');
      }

      switch (action) {
        case 'approve':
          switch (blogRevision.revisionType) {
            case 'CREATE':
              return await query.createBlogAndApproveRevision(blogRevision);
            case 'UPDATE':
              return await query.updateBlogAndApproveRevision(blogRevision);
            case 'DELETE':
              return await query.deleteBlogAndApproveRevision(blogRevision);
            default:
              throw new Error('Invalid revision type');
          }
        case 'reject':
          return await query.rejectBlogRevision(blogRevision);
        default:
          throw new Error('Invalid action');
      }
    } catch (error) {
      throw error;
    }
  };

  updateBlog = async (req) => {
    try {
      const token = await helper.extractToken(req);
      await jwt.authAdmin(token);

      const blogId = req.params.blogId;
      const newData = req.body;

      return await query.updateBlog(blogId, newData);
    } catch (error) {
      throw error;
    }
  };

  deleteBlog = async (req) => {
    try {
      const token = await helper.extractToken(req);
      const user = await jwt.authUser(token);

      const { blogId } = req.params;

      const blog = await query.fetchBlog(blogId);
      if (!blog) {
        throw new Error('Invalid blogId');
      }
      if (blog.userId !== user.userId && !user.isAdmin) {
        throw new Error('Access denied');
      }

      const userIsAnEmployee = await query.isUserAnEmployee(user.userId);
      if (!userIsAnEmployee && !user.isAdmin) {
        await query.deletePendingBlog(user.userId, blogId, blog);
        return 'Blog deletion pending admin approval';
      }

      await query.deleteBlog(blogId);
      return 'Blog deleted successfully';
    } catch (error) {
      throw error;
    }
  };
}

exports.blogs = new BlogServices();

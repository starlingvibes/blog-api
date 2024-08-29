const { query } = require('./queryServices');
const { jwt } = require('../../utils/jwt');
const { helper } = require('../../utils/helpers');

class BlogServices {
  fetchAllBlogs = async (req) => {
    try {
      const token = await helper.extractToken(req);
      await jwt.authUserOrAdmin(token);
      return await query.fetchBlogs(req.query);
    } catch (error) {
      throw error;
    }
  };

  fetchSingleBlog = async (req) => {
    try {
      const token = await helper.extractToken(req);
      await jwt.authAdmin(token);
      const data = await query.fetchBlog(req.params.blogId);
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

      return await query.createBlog(req.body);
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
      await jwt.authAdmin(token);

      const blog = await query.fetchBlog(req.params.blogId);

      if (!blog) {
        throw new Error('Invalid blogId');
      }

      return await query.deleteBlog(req.params.blogId);
    } catch (error) {
      throw error;
    }
  };
}

exports.blogs = new BlogServices();

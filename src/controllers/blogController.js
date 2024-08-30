const blogRouter = require('express').Router();
const { response } = require('../utils/responses');
const { inputs } = require('../middlewares/blogMiddleware');
const { blogs } = require('../services/blog/blogServices');

blogRouter.post('/', inputs.createBlog(), async (req, res) => {
  try {
    const result = await blogs.createBlog(req);
    response.success(res, 'Blog created successfully', result);
  } catch (error) {
    response.error(res, error.message);
  }
});

blogRouter.get('/', inputs.fetchBlogs(), async (req, res) => {
  try {
    const result = await blogs.fetchAllBlogs(req);
    response.success(res, 'Blogs retrieved successfully', result);
  } catch (error) {
    response.error(res, error.message);
  }
});

blogRouter.get('/personal', inputs.fetchPersonalBlogs(), async (req, res) => {
  try {
    const result = await blogs.fetchPersonalBlogs(req);
    response.success(res, 'Personal blogs retrieved successfully', result);
  } catch (error) {
    response.error(res, error.message);
  }
});

blogRouter.get('/revision', inputs.fetchBlogRevisions(), async (req, res) => {
  try {
    const result = await blogs.fetchAllBlogRevisions(req);
    response.success(res, 'Blogs revisions retrieved successfully', result);
  } catch (error) {
    response.error(res, error.message);
  }
});

blogRouter.post(
  '/revision/evaluate',
  inputs.evaluateBlogRevision(),
  async (req, res) => {
    try {
      const result = await blogs.evaluateBlogRevision(req);
      response.success(res, 'Blog revision evaluated successfully', result);
    } catch (error) {
      response.error(res, error.message);
    }
  }
);

blogRouter.get('/:blogIdOrSlug', inputs.fetchBlog(), async (req, res) => {
  try {
    const result = await blogs.fetchSingleBlogByIDOrSlug(req);
    response.success(res, 'Blog retrieved successfully', result);
  } catch (error) {
    response.error(res, error.message);
  }
});

blogRouter.put('/:blogId', inputs.updateBlog(), async (req, res) => {
  try {
    const result = await blogs.updateBlog(req);
    response.success(res, result, null);
  } catch (error) {
    response.error(res, error.message);
  }
});

blogRouter.delete('/:blogId', inputs.deleteBlog(), async (req, res) => {
  try {
    const data = await blogs.deleteBlog(req);
    response.success(res, data, null);
  } catch (error) {
    response.error(res, error.message);
  }
});

module.exports = blogRouter;

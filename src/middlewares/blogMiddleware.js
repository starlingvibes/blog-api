const { celebrate, Joi, Segments } = require('celebrate');

class blogMiddleware {
  fetchBlogs = () =>
    celebrate({
      [Segments.QUERY]: Joi.object().keys({
        q: Joi.string(),
        page: Joi.number().default(1),
        limit: Joi.number().default(10),
        title: Joi.string(),
      }),
    });

  fetchPersonalBlogs = () =>
    celebrate({
      [Segments.QUERY]: Joi.object().keys({
        q: Joi.string(),
        page: Joi.number().default(1),
        limit: Joi.number().default(10),
        title: Joi.string(),
      }),
    });

  fetchBlogRevisions = () =>
    celebrate({
      [Segments.QUERY]: Joi.object().keys({
        q: Joi.string(),
        page: Joi.number().default(1),
        limit: Joi.number().default(10),
        status: Joi.string().valid('pending', 'approved', 'rejected'),
      }),
    });

  fetchBlog = () =>
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        q: Joi.string(),
      }),
    });

  fetchPositionsWithBlogs = () =>
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        q: Joi.string(),
      }),
    });

  createBlog = () =>
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required().trim().label('title'),
        description: Joi.string().required().trim().label('description'),
        coverImage: Joi.string().required().trim().label('coverImage'),
        html: Joi.string().required().trim().label('html'),
        markdown: Joi.string().required().trim().label('markdown'),
      }),
    });

  updateBlog = () =>
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        title: Joi.string().trim().label('title'),
        description: Joi.string().trim().label('description'),
        coverImage: Joi.string().trim().label('coverImage'),
        html: Joi.string().trim().label('html'),
        markdown: Joi.string().trim().label('markdown'),
      }),
    });

  evaluateBlogRevision = () =>
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        blogRevisionId: Joi.string().required().trim().label('blogRevisionId'),
        action: Joi.string()
          .valid('approve', 'reject')
          .required()
          .trim()
          .label('action'),
      }),
    });

  deleteBlog = () =>
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        blogId: Joi.string().required().trim().label('blogId'),
      }),
    });
}

exports.inputs = new blogMiddleware();

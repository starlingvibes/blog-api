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

  deleteBlog = () =>
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        blogId: Joi.string().required().trim().label('blogId'),
      }),
    });
}

exports.inputs = new blogMiddleware();

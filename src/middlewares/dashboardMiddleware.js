const { celebrate, Joi, Segments } = require('celebrate');

class dashboardMiddleware {
  fetchUsers = () =>
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        q: Joi.string(),
        status: Joi.string().valid('approved', 'pending', 'rejected'),
        page: Joi.number().default(1),
        pageSize: Joi.number().default(10),
      }),
    });

  fetchUser = () =>
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        q: Joi.string(),
      }),
    });
}

exports.inputs = new dashboardMiddleware();

const { celebrate, Joi, Segments } = require('celebrate');

class organizationMiddleware {
  fetchOrganizations = () =>
    celebrate({
      [Segments.QUERY]: Joi.object().keys({
        q: Joi.string(),
        page: Joi.number().default(1),
        limit: Joi.number().default(10),
      }),
    });

  fetchOrganization = () =>
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        q: Joi.string(),
      }),
    });

  fetchPositionsWithOrganizations = () =>
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        q: Joi.string(),
      }),
    });

  createOrganization = () =>
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required().trim().label('title'),
        description: Joi.string().required().trim().label('description'),
        html: Joi.string().required().trim().label('html'),
        markdown: Joi.string().required().trim().label('markdown'),
      }),
    });

  deleteOrganization = () =>
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        organizationId: Joi.string().required().trim().label('organizationId'),
      }),
    });
}

exports.inputs = new organizationMiddleware();

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
        name: Joi.string().required().trim().label('name'),
        tagline: Joi.string().required().trim().label('tagline'),
        logo: Joi.string().required().trim().label('logo'),
        websiteUrl: Joi.string().required().trim().label('websiteUrl'),
      }),
    });

  addOrganizationEmployee = () =>
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        organizationId: Joi.string().required().trim().label('organizationId'),
        userId: Joi.string().required().trim().label('userId'),
        position: Joi.string().required().trim().label('position'),
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

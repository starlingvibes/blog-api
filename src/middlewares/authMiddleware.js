const { celebrate, Joi, Segments } = require('celebrate');

class authMiddleware {
  signUp = () =>
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        firstName: Joi.string().required().trim().label('firstName'),
        lastName: Joi.string().required().label('lastName'),
        email: Joi.string().required().min(6).email().trim().label('email'),
        password: Joi.string().required().trim().label('password'),
      }),
    });

  signIn = () =>
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().min(6).email().trim().label('email'),
        password: Joi.string().required().trim().label('password'),
      }),
    });
}

exports.inputs = new authMiddleware();

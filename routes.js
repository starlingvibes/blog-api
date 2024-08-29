const authRouter = require('./src/controllers/authController');
const profileRouter = require('./src/controllers/profileController');
const organizationRouter = require('./src/controllers/organizationController');
const blogRouter = require('./src/controllers/blogController');
const healthRouter = require('./src/controllers/healthController');

const apiPrefix = '/v1';

const routes = [
  { route: authRouter, prefix: '/auth' },
  { route: profileRouter, prefix: '/profile' },
  { route: organizationRouter, prefix: '/organization' },
  { route: blogRouter, prefix: '/blog' },

  // Server health monitoring
  { route: healthRouter, prefix: '/health' },
];

appRouter = (app) => {
  routes.forEach((element) => {
    app.use(`${apiPrefix}${element.prefix}`, element.route);
  });
  return app;
};

module.exports = appRouter;

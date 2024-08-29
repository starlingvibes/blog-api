const healthRouter = require('express').Router();
const { response } = require('../utils/responses');

healthRouter.get('/', async (req, res) => {
  try {
    const result = `Server is healthy and running on port ${process.env.PORT}`;
    response.success(res, result, null);
  } catch (error) {
    response.error(res, error.message);
  }
});

module.exports = healthRouter;

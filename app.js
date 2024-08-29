const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const appRouter = require('./routes');
const { isCelebrateError } = require('celebrate');
const { response } = require('./src/utils/responses');
const app = express();

const corsOptions = {
  origin: /^https?:\/\/(www\.)?blog\.com/,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

appRouter(app);

app.use((error, req, res, next) => {
  if (isCelebrateError(error)) {
    const errorMessage =
      error.details.get('body') ||
      error.details.get('query') ||
      error.details.get('params');
    const message = errorMessage.message.replace(/"/g, '');
    return response.error(res, message);
  }
  next();
});

app.use('*', (req, res) => {
  return response.error(res, 'Route not found', null, ['Invalid URL request']);
});

module.exports = app;

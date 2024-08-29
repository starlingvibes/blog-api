class Response {
  error = (res, message, data = null) => {
    return res.status(400).json({
      status: false,
      message: message || 'Bad request',
      data,
    });
  };

  success = (res, message, data) => {
    return res.status(200).json({
      status: true,
      message,
      data,
    });
  };

  unauthorized = (res, message, data = null) => {
    return res.status(401).json({
      status: false,
      message: message || 'Unauthorized',
      data,
    });
  };
}

exports.response = new Response();

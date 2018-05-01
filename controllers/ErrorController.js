const models = require('../models');

class ErrorController {
  constructor() {}

  returnError(params) {
    const { res, errorCode, message, data, customHeader } = params;
    const error = {
      meta: {
        code: errorCode,
        message
      },
      data
    };
    res.statusCode = errorCode;
    res.setHeader('Content-type', 'application/json');
    res.json(error);
    res.end();
  }
}

module.exports = ErrorController;
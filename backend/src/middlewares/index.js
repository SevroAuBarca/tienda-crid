module.exports = {
  asyncErrorsHandler: (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next),
  sucessRequest: (res, status = 200, message = "ok", body = {}) => {
    res.status(status).json({ message, body });
  },
  errorRequest: (res, error = null) => {
    const { statusCode, message } = error
      ? error
      : new createError.InternalServerError();
    res.status(statusCode).json({ message });
  },
};

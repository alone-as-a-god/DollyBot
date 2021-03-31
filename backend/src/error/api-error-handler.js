const APIError = require("./APIError");

function apiErrorHandler(err, req, res, next) {
  console.error(err);
  if (err instanceof APIError) {
    if (!err.message) return res.sendStatus(err.status);
    if (err.status) return res.status(err.status).json({ error: err.message });
  }
  res.send(500).json("Something went wrong.");
}
module.exports = apiErrorHandler;

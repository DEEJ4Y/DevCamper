const errorHandler = (err, req, res, next) => {
  console.log(err.stack.red);

  // Mongoose bad objectID
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
  }

  res
    .status(err.statusCode || 500)
    .json({ success: false, error: err.message });
};

module.exports = errorHandler;

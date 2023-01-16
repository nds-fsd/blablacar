const errorLogging = (err, req, res, next) => {
  console.error(err.stack);
  res.status(errorStatus).send(err.message);
  return;
};

export default errorLogging;

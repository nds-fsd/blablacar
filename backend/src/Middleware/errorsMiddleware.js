const errorLogging = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status).send(err.message);
  return;
};

export default errorLogging;

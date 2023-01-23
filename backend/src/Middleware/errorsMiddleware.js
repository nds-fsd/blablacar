const errorLogging = (err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  /* 
    // En caso queremos devolver un objeto JSON con value error
    const errorObj = {
    "error": err.message
  }; */
  res.status(status).json({success: false, error: err.message});
  return;
};

module.exports=(errorLogging);

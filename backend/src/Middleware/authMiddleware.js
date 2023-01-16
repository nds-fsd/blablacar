const validateAuthEmail = (req, res, next) => {
  const authEmail = req.body.email;

  if (!authEmail) {
    //res.status(errorStatus).send({message: "Email is missing"});
    //console.log("Name is missing");
    let errorMessage = new Error("Email is missing");
    err.status = 401;
    return next(errorMessage);
  }

  Database.users
    .findOne({ email: authEmail })
    .then((email) => {
      if (!email) {
        let errorMessage = new Error("User not found with this email");
        err.status = 400;
        return next(errorMessage);
      }
      next();
    })
    .catch((err) => {
      let errorMessage = new Error(
        "Something went wrong with email middleware"
      );
      return next(errorMessage);
    });
};

const validateAuthPassword = (req, res, next) => {
  const authPassword = req.body.password;
  if (!authPassword) {
    let errorMessage = new Error("Password is missing");
    err.status = 401;
    return next(errorMessage);
  }
  Database.users.findOne({ email: req.body.email });
};

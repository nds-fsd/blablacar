import Users from "../mongo/schemas/user.js";
import { validationResult } from "express-validator";
import Bcrypt from "bcryptjs";

// Envía el error al middleware de captura de errores, si express-validator retorna un error
const formalEmailValidation = (req, res, next) => {
  const validationError = validationResult(req);
  if (!validationError.isEmpty()) {
    let parsedError = JSON.stringify(validationError.errors);
    let err = new Error(parsedError);
    err.status = 422;
    return next(err);
  }
  next();
};

// Verifica si el email es presente en nuestra base de datos.
// En caso afirmativo, adiciona a la request req.email
const validateAuthEmail = (req, res, next) => {
  const authEmail = req.body.email;

  /* No sirve,  el middleware lo controla todo. 
    if (!authEmail) {
    let err = new Error("Email is missing");
    err.status = 400;
    return next(err);
  } */

  Users.findOne({ email: authEmail })
    .then((user) => {
      if (!user) {
        let err = new Error("User not present in oue DB with this email");
        err.status = 400;
        return next(err);
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      let errorMessage = new Error(
        `Something went wrong with email DB verification. Error stack: ${err}`
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

  // Utilizo el condicional si se quiere utilizar solamente la verificación de pwd sin email y evitar doble llamada al db.

  if (!req.user) {
    Users.findOne({ email: req.email })
      .then((user) => {
        const dbPwd = Bcrypt.compareSync(req.body.password, user.password);
        if (!dbPwd) {
          throw new Error("Password does not match (1)");
        }

         return next();
      })
      .catch((err) => {
        err.status = 403;
        return next(err);
      });
  };
  const dbPwd = Bcrypt.compareSync(req.body.password, req.user.password);
  if (!dbPwd) {
    let err = new Error("Password does not match (2)");
    err.status = 403;
    return next(err);
  }
};

export { formalEmailValidation, validateAuthEmail, validateAuthPassword };

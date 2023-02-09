// import Users from "../mongo/schemas/user.js";
const JsonWebToken = require('jsonwebtoken');




const jwtTokenSign = (req, res, next) => {
// User registration or login: return a new token
const secret = process.env.JWT_SECRET
const expires = process.env.JWT_EXPIRATION_TIME
console.log(secret);
if (req.user) {
    console.log(req.user);
    const jwtToken = JsonWebToken.sign({id: req.user._id, email: req.user.email }, secret, { expiresIn: expires });
    console.log(jwtToken);
    req.jwtToken = jwtToken;
    next();
}  
// Verify token expiration and return a new token;
};

const jwtTokenVerify = async(req, res, next) => {
  //const authHeader = req.headers["authorization"];
  const authHeader = req.headers.authorization
  const secret = process.env.JWT_SECRET
  console.log(authHeader);
  //if (!authHeader) return res.status(401).json({error: "Unauthorized"});
  let header = authHeader.split(" ")[1]
  
  console.log(header);
  // Sin token, devolvemos 401
  let token=header[1]
  console.log(token);
  if (!token) return res.status(401).json({error: "Unauthorized"});

  let tokenPayload;
  

  
    // Si funciona, devolverá el payload 
    console.log("entro a verificar");
    console.log(token);
    console.log(secret);
    try{
    tokenPayload = JsonWebToken.verify(token, secret)
    console.log(tokenPayload);}
    catch
    {return res.status(401).json({error: "Unauthorized"});}

    
  

  // Guardamos los datos del token en la request y pasamos a next
  req.jwtPayload = tokenPayload;

  next();
};

module.exports= { jwtTokenSign, jwtTokenVerify }
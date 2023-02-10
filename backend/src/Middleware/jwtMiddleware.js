// import Users from "../mongo/schemas/user.js";
const JsonWebToken = require('jsonwebtoken');
const jwt = require('jsonwebtoken')




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


const jwtTokenSingTest = (req, res, next) => {
  const secret = process.env.JWT_SECRET
  const today = new Date()
  const expirationDate = new Date()
  expirationDate.setDate(today.getDate() + 60)

  let payload = {
    id: req.user._id,
    email: req.user.email
  }

  req.jwtToken = jwt.sign(payload, secret ,{
    expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
  })
  next()
}

const jwtTokenVerify = (req, res, next) => {
  //const authHeader = req.headers["authorization"];
  const secret = process.env.JWT_SECRET
  const token =  req.headers.authorization.split(' ')[1]
  // Sin token, devolvemos 401
  if (!token) return res.status(401).json({error: "No token provided"});
    // Si funciona, devolverá el payload 
    console.log("entro a verificar");
    // try{
    //   const tokenPayload = JsonWebToken.verify(token, secret)
    // console.log('payload',tokenPayload);
    // }catch
    // {return res.status(401).json({error: "Unauthorized"});}
    jwt.verify(token, secret, (err, payload) => {
      if(err){
        console.log(err)
        return res.status(403).json({error: 'Invalid Token'})
      }else{
        req.payload = payload
        next()
      }
    }
    )}
  
    // try{
    //   const tokenVerify  = JsonWebToken.verify(token, secret)
    //   console.log(tokenVerify)
    // }catch(e){
    //  return res.status(401).json({error: "Unauthorized"})
    // }
  

  // Guardamos los datos del token en la request y pasamos a next



module.exports= { jwtTokenSign, jwtTokenVerify, jwtTokenSingTest}
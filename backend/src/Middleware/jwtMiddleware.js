// import Users from "../mongo/schemas/user.js";
import JsonWebToken from 'jsonwebtoken';

const jwtTokenSign = (req, res, next) => {
// User registration or login: return a new token
if (req.user) {
    const jwtToken = JsonWebToken.sign({id: req.user._id, email: req.user.email}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION_TIME });
    req.jwtToken = jwtToken;
    next();
}  
// Verify token expiration and return a new token;
};

const jwtTokenVerify = (req, res, next) => {
    next();
};

export{ jwtTokenSign, jwtTokenVerify }

const authUser = (req, res) => {
     const expirationTime = Number(process.env.JWT_EXPIRATION_TIME)/3600;
     const userObj = {
        userID : req.user._id,
        name: req.user.name,
        surname: req.user.surname,
        birthday: req.user.birthday,
        treatment: req.user.treatment
     }
    res.status(200).json({success: true, jwtToken: req.jwtToken, expirationHours: expirationTime, userObj: userObj});
}

module.exports={authUser}
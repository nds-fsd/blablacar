
const authUser = (req, res) => {
     const expirationTime = Number(process.env.JWT_EXPIRATION_TIME)/3600;
     const userObj = {
        userID : req.user._id,
        userName: req.user.firstName,
        surname: req.user.surname,
        birthday: req.user.birthday,
        treatment: req.user.treatment,
        picUrl:req.user.picUrl
        
     }
     console.log("res es");
     console.log(userObj);

    res.status(200).json({success: true, jwtToken: req.jwtToken, expirationHours: expirationTime, userObj: userObj});
}

module.exports={authUser}
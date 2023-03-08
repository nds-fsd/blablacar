
const validateUserInput = (req, res, next) => {
    const newUser = req.body;
    if(newUser.firstName === undefined || newUser.firstName.length === 0){
        res.status(400).send({message: "Name is missing"});
        return;
    }
    else if(newUser.surname === undefined || newUser.surname.length === 0){
        res.status(400).send({message: "Surname is missing"});
        return;
    }
    else if(newUser.email === undefined || newUser.email.length === 0){
        res.status(400).send({message: "Email is missing"});
        return;
    }
    else if(newUser.Birthday === undefined || newUser.Birthday.length === 0){
        res.status(400).send({message: "Date of birth is missing"});
        return;
    }
    else if(newUser.treatment === undefined || newUser.treatment === "Tratamiento" || newUser.treatment.length === 0){
        res.status(400).send({message: "Treatment is missing"});
        return;
    }
    else if(newUser.password === undefined || newUser.password.length === 0){
        res.status(400).send({message: "Password is missing"});
        return;
    }
    next();
};

module.exports=validateUserInput;
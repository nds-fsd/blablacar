const validateTripInput = (req, res, next) => {
    console.log("Request Type:", req.method);
    const newTrip = req.body;
    if(newTrip.origin === undefined || newTrip.origin.length === 0){
        res.status(400).send({message: "Origin is missing"});
        console.log("Origin is missing");
        return;
    }
    else if(newTrip.destination === undefined || newTrip.destination.length === 0){
        res.status(400).send({message: "Destination is missing"});
        console.log("Destination is missing");
        return;
    }
    else if(newTrip.seats === undefined || newTrip.seats.length === 0){
        res.status(400).send({message: "Number of seats is missing"});
        console.log("Number of seats is missing");
        return;
    }
    else if(newTrip.price === undefined || newTrip.price.length === 0){
        res.status(400).send({message: "Price is missing"});
        console.log("Price is missing");
        return;
    }
    else if(newTrip.originDate === undefined || newTrip.originDate.length === 0){
        res.status(400).send({message: "Start date is missing"});
        console.log("Start date is missing");
        return;
    }
    else if(newTrip.destinationDate === undefined || newTrip.destinationDate.length === 0){
        res.status(400).send({message: "Destination date is missing"});
        console.log("Destination date is missing");
        return;
    }
    else if(newTrip.originDate > newTrip.destinationDate){
        res.status(400).send({message: "Origin date can not be later than destination date"});
        console.log("Origin date can not be later than destination date");
        return;
    }
    next();
};

const forwardGeocode = (req, res, next) =>{
    const newTrip = req.body;

}

module.exports=(validateTripInput, forwardGeocode);
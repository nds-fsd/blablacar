
const dotenv =require ('dotenv');
const mongoose =require ('mongoose');
const {MongoMemoryServer} = require ('mongodb-memory-server')
dotenv.config();

const connectDB = async () =>{

    let dbUrl = process.env.MONGO_URL;
  if (process.env.NODE_ENV === 'test') {
      mongod = await MongoMemoryServer.create();
      console.log("created");
      dbUrl = mongod.getUri();
      console.log(dbUrl);
  }

  mongoose.set("strictQuery", false);

  try {
    await  mongoose.connect(dbUrl);

    const mongo = mongoose.connection;
    mongo.on("error", (error) => console.error(error));
    mongo.once("open", () => {
      console.log("connected to database, yuppy!");
    });
  }catch (e){
    console.log(e);
  }
    

};

const disconnectDB = async () => {
    try {
        await mongoose.connection.close();
        if (mongod) {
            await mongod.stop();
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports= { connectDB, disconnectDB };


const mongoose = require('mongoose');

module.exports = async function main() {
    try{
        mongoose.set('strictQuery', false);
        console.log("Connecting to Mongodb...")
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
    }
    catch(err){
        console.log(err)
        console.log("failed to connect db")
    }
    console.log("Connected to DB");
}


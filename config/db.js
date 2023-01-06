const mongoose = require('mongoose');

module.exports = async function main() {
    try{
        mongoose.set('strictQuery', false);
        console.log("Connecting to Mongodb...")
        await mongoose.connect('mongodb+srv://kgbuyna:bit1bish@goodreads.vyxvuzz.mongodb.net/?retryWrites=true&w=majority',{
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


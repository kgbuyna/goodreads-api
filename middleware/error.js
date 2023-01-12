const errorHandler = (err, req, res, next) =>{
    console.log("Error handler ajillav");
    console.log("error: " + err);
    const error = {...err};

    if(error.code === 11000){
        error.message = "Энэ талбарын утгыг давхардуулж өгч болохгүй."
        error.statusCode = 400; 
    }

    res.status(err.statusCode||500).json({
        success: false, 
        error: err.message,        
    })
}
module.exports = errorHandler; 
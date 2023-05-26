const errorhandler=require("../utils/errorhandler");
module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode||500;
    err.message=err.message||"Internal Server Error";

    //wrong mongodb error
    if(err.name==="CastError"){
        const message=`Resource Not found. Invalid ${err.path}`;
        err=new errorhandler(message,400)
    }
    res.status(err.statusCode).json({
        success:false,
        error:err
    })
};
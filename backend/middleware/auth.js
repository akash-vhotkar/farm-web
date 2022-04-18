const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncError( async (req,res,next)=>{

    // const {token} = req.cookies;
    // console.log(token)
    // if(!token){
    //     return next(new ErrorHandler("Please login to access this resource", 401));
    // }

    // const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    // req.user = await User.findById(decodedData.id);

    // next();

    const token= req.headers.cookies;
    console.log(req.headers)
    console.log("from local")
    console.log(token)
    if(!token){
        return next(new ErrorHandler("Please login to access this resource", 401));
    }
    const decodedData=jwt.verify(token, 'test')
    console.log("YESS")
    req.user = await User.findById(decodedData.id);

    next();
});

exports.authorizeRoles = (...roles)=>{

    return(req, res, next) => {
        console.log("IN")
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(
                `Role: ${req.user.role} is not allowed to access this resource.`,403
                )
            );
        };
        next();
    };
}
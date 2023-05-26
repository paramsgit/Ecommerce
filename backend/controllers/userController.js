const Errorhandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const bcryptjs=require("bcryptjs");
const User = require('../models/userModel');



//Create a new user using POST "/api/auth/createuser"---Do not require login
exports.registerUser =catchAsyncError(async (req, res) => {
    
        const { name, email, password } = req.body;
        console.log("Good 1");
        console.log(name);
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          avatar: {
            public_id: "This is id",
            url: "avatarurl",
          },
        });
    
        const authtoken = user.getJWTToken();
        res.status(201).json({
            success:true,
            authtoken
            
        });
    
    
});

//login  User
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    // checking if user has given password and email both
    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email & Password", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
  
    const isPasswordMatched = await user.comparePassword(password);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
    const authtoken = user.getJWTToken();
    res.status(200).json({
        success:true,
        authtoken
        
    });
    
  });
  

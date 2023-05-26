const Product=require("../models/productModel");
const Errorhandler = require("../utils/errorhandler");
const catchAsyncError=require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
//Create Product ----Admin
exports.createProduct= catchAsyncError(async(req,res,next)=>{
        const product=await Product.create(req.body);
        res.status(201).json({success:true,product});
    
});
//Get all products
exports.getAllProducts=catchAsyncError(async(req,res)=>{
    const resultPerPage=5;
    const productCount=await Product.countDocuments();
    const apiFeature=new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const products=await apiFeature.query;
    res.status(200).json({success:true,products,productCount});
    
});

//Get Product Details
exports.getProductDetails=catchAsyncError(async(req,res,next)=>{
    
    const product=await Product.findById(req.params.id);

    if(!product){
        return next(new Errorhandler("Product Not found",404));
        // return res.status(500).json({
        //     success:false,
        //     message:"Product Not found"
        // })
    }
    res.status(200).json({success:true,product});
});


//Update Products ---Admin
exports.updateProduct=catchAsyncError(async(req,res,next)=>{
    let product=await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product Not found"
        })
    }
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({success:true,product});
});


//Delete Product---Admin
exports.deleteProduct=catchAsyncError(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product Not found"
        })
    }
    await product.deleteOne();
    res.status(200).json({success:true,message:"Product Deleted"});
});
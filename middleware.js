const { productSchema } = require("./schema");
const { reviewSchema } = require("./schema");
const passport = require('passport');
const Product = require("./models/Product");

  
// const validateProduct = (req,res,next)=>{
//     const{name,price,desc,img} = req.body;
//     // it returns me two thing value and error mera ko yha value ki need nhi hai kyuki mai bss validate kr rha hu the thing i need is ki mera ko bss error ko handel krna hai 
//     const {error} = productSchema.validate({name,price,desc,img})
//     if(error){
//         return res.render('error');
//     }
//     // agar error nhi hai toh next chl jaeiyga ie validate hone k baad wale step p chala jaeiyga
//     next();
// }
const validateProduct = (req,res,next)=>{
    const {name, img, price , desc} = req.body;
    const {error} = productSchema.validate({name,img,price,desc});
    
    if(error){
        const msg = error.details.map((err)=>err.message).join(',');
        return res.render('error' , {err:msg});
    }
    next();
}


const validateReview = (req,res,next)=>{

    const {rating, comment} = req.body;
    const {error} = reviewSchema.validate({rating,comment});

    if(error){
        const msg = error.details.map((err)=>err.message).join(',');
        return res.render('error' , {err:msg});
    }
    next();
}


// const isLoggedIn = (req,res,next) =>{
//     if(!req.isAuthenticated()){
//         req.flash('error','please login first');
//         // mera ko next nhi krna kyuki user login nhi hai toh mena seedha login p redirect kara diya
//         return res.redirect('/login');
//     }
//     next();
// }
const isLoggedIn = (req,res,next)=>{
    // console.log(req.originalUrl);
    // console.log(req.xhr);
    if(req.xhr && !req.isAuthenticated()){
        return res.status(401).json({msg:'you need to login first'});
    }
    
    if(!req.isAuthenticated()){
        req.flash('error' , 'you need to login first');
        return res.redirect('/login');
    }
    next();
} 


// const isSeller = (req,res,next)=>{
//     // agar role nhi hai tb bhi glt hai 
//     if(!req.user.role){
//         req.flash('error','You dont have the permission to do that');
//         return res.redirect('/products');
//     }
//     // aur agar role hai and voh seller k equal nhi hai tb bhi voh nhi jaeiy aga
//     else if(req.user.role !== 'seller'){
//         req.flash('error','You dont have the permission to do that');
//         return res.redirect('/products');
//     }
//     next();
// }
const isSeller = (req,res,next)=>{
    if(!req.user.role){
        req.flash('error' , 'you donot have the permission to do that');
        return res.redirect('/products');
    }
    else if(req.user.role !== 'seller'){
        req.flash('error' , 'you donot have the permission to do that');
        return res.redirect('/products');
    }
    next();
}





const isProductAuthor = async(req,res,next)=>{
//to get the id of thatparticular product
    let {id} = req.params;
    const product = await Product.findById(id);
    console.log(product.author);
    console.log(req.user);
    if(!product.author.equals(req.user._id)){
        req.flash('error' , 'you donot have the permission to do that');
        return res.redirect(`/products/${id}`);
    }
    next();
}


module.exports = {validateProduct ,validateReview , isLoggedIn , isSeller , isProductAuthor} ;
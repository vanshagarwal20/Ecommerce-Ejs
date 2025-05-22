const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const router = express.Router();//mini instance
const {validateProduct,isLoggedIn,isSeller,isProductAuthor} = require('../middleware')



// to show all the products
router.get('/products', async(req,res)=>{
    try{
        let products = await Product.find({});
        res.render('products/index',{products})
    }
    catch(e){
        res.status(500).render('error',{err : e.message})
    }    
})


// to show the form for new product
router.get('/product/new' , isLoggedIn, (req,res)=>{
    try {
        res.render('products/new')
    } catch (e) {
        res.status(500).render('error',{err : e.message})
    }
    
})

// to actually add the product in db
// jb form submit kara tb req.body mai hoga sab and wha sa nikla and model ki help p new bana diya db mai thn redirect kr diya 
router.post('/products', validateProduct, isLoggedIn,isSeller, async(req,res)=>{
    try {
        let{name,img,price,desc} = req.body;
        await Product.create({name,img,price,desc,author:req.user._id});
        req.flash('success','Product added successfully');
        res.redirect('/products')
    } catch (e) {
        res.status(500).render('error',{err : e.message})
    }    
})



// to show a particular product
router.get('/products/:id',isLoggedIn,async(req,res)=>{
    try {
        let {id} = req.params;
        // let foundProduct = await Product.findById(id);
        // reviews k ander id hai isliya we use this id only
        let foundProduct = await Product.findById(id).populate('reviews');
        // yha sa bhejna hoga jesa show wala page p show ho jaeiy
        // ya flash wlaa isliya add kra kyuki jb mena review mai flahs lageiyga tha toh i wnat ki db mai add hote hi mai yha a rha hu toh yah mssg dekhna chaieya hai toh 
        // mena yha sa mssg bhj diya and wha sa mssg as a key thi toh uski k accrding accept krle yha ab show mai jaker chnge kr lunga 
        res.render('products/show',{product: foundProduct,msg:req.flash('msg')})
    } catch (error) {
        res.status(500).render('error',{err : e.message})
    }
})



// form to edit the product
router.get('/products/:id/edit',isLoggedIn ,async(req,res)=>{
    try {
        let {id} = req.params;
        let foundProduct = await Product.findById(id);
        res.render('products/edit',{foundProduct})
    } catch (e) {
        res.status(500).render('error',{err : e.message})
    }   
})


// to actually edit the data in db
router.patch('/products/:id',validateProduct,isLoggedIn, async(req,res)=>{
    try {
        let {id} = req.params;
        let{name,img,price,desc} = req.body;
        await Product.findByIdAndUpdate(id,{name,img,price,desc});
        req.flash('success','Product editted successfully');
        res.redirect(`/products/${id}`)
    } catch (e) {
        res.status(500).render('error',{err : e.message})
    }    
})



// to delete a product
router.delete('/products/:id',isLoggedIn,isProductAuthor,async(req,res)=>{
    try {
        let {id} = req.params;
    
        // it is the non-production way to delete the reviews
        // const product = await Product.findById(id);
        // for(let id of product.reviews){
        //     await Review.findByIdAndDelete(id)
        // }
        const product = await Product.findById(id);
        await Product.findByIdAndDelete(id);
        req.flash('success','Product deleted successfully');
        res.redirect('/products')
    } 
    catch (e) {
        res.status(500).render('error',{err : e.message})
    }    
})








module.exports = router;







const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const router = express.Router();//mini instance
const {validateReview} = require('../middleware')



// router.post('/products/:id/review' ,validateReview, async (req,res)=>{
//     try {
//         let {id} = req.params;
//         let{rating,comment} = req.body;
//         const product = await Product.findById(id);
//         const review = new Review({rating,comment});
//         product.reviews.push(review);
//         await review.save();
//         await product.save();
//         // for flash mssg key corresponding to message
//         // y mssg wha dekhana hai jha mai redirect kr rha hu
//         req.flash('success','Review added successfully')
//         res.redirect(`/products/${id}`);
//     } catch (e) {
//         res.status(500).render('error',{err : e.message})
//     }

    
// })








router.post('/products/:productid/review',validateReview,async(req, res) => {


    try {
        const { productid } = req.params;
        const { rating, comment } = req.body;

        const product = await Product.findById(productid);

        const review = new Review({ rating, comment });

        // Average Rating Logic
        const newAverageRating = ((product.avgRating * product.reviews.length) + parseInt(rating)) / (product.reviews.length + 1);
        product.avgRating = parseFloat(newAverageRating.toFixed(1));

        product.reviews.push(review);

        await review.save();
        await product.save();

        req.flash('success', 'Added your review successfully!');
        res.redirect(`/products/${productid}`);
    }

    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
    
});


module.exports = router;
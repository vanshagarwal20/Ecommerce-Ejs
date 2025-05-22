const mongoose = require("mongoose");
const Review = require("./Review");
const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim:true
    } ,
    img :{
        type : String,
        trim:true,
        default : '/images/product.jpg'
    },
    price : {
        type : Number,
        default:0,
        min : 0
    },
    desc :{
        type : String,
        trim : true
    },
    avgRating :{
        type: Number,
        default:0 
    },
    reviews:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Review'

        }
    ],
    // ek hi author hoga isliya no array
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
})



// middleware jo bts mongidb operations karwane par use hota hai and iska ander pre and post middleware hote hai 
// which are basically used over the schema and before the model
// model is js class
// pre aur post dono kr skta hu
// y product mena catch kara product wala route sa kyuki jb wha delete wala route chla hoga tb y middleware chaleiyga 
productSchema.post('findOneAndDelete', async function(product){
    if(product.reviews.length>0){
        await Review.deleteMany({_id:{$in:product.reviews}})
    }
})



let Product = mongoose.model('Product',productSchema);
module.exports = Product;
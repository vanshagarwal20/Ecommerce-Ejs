const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose')



const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        trim : true
    },
    role : {
        type : String,
        required : true
    },
    cart : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Product'
        }
    ],
    wishList:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ],
})


// it is important to use plm and put after schema and before models
// plugins hamesha schema mai lgta hai 
userSchema.plugin(passportLocalMongoose); 


let User = mongoose.model('User',userSchema);
module.exports = User;
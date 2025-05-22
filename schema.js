// schema for ssv (server side validation) with the help of joi
const Joi = require('joi');

// model ki schema ki keys ko server side validate kr dega
const productSchema = Joi.object({
    name: Joi.string().required(),
    img: Joi.string().required(),
    price : Joi.string().min(0).required(),
    desc : Joi.string().required()
});

const reviewSchema = Joi.object({
    rating: Joi.string().min(0).max(5).required(),
    comment: Joi.string().required(),
})



module.exports = {productSchema,reviewSchema}
const mongoose = require('mongoose');
const Product = require('./models/Product')

const products = [{
    name: "Iphone-14pro",
    img : 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lfGVufDB8fDB8fHww',
    price: 130000,
    description: "Very Costly"  
    },
    {
        name: "Macbook ",
        img : 'https://images.unsplash.com/photo-1617471346061-5d329ab9c574?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFja2Jvb2t8ZW58MHx8MHx8fDA%3D',
        price: 150000,
        description: "Very Much" 
    },
    {
        name: "Iwatch ",
        img : 'https://images.unsplash.com/photo-1517420879524-86d64ac2f339?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXdhdGNofGVufDB8fDB8fHww',
        price: 150000,
        description: "Very Much" 
    },
    {
        name: "Ipad ",
        img : 'https://plus.unsplash.com/premium_photo-1681139760927-4c510ce6d8f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aXBhZHxlbnwwfHwwfHx8MA%3D%3D',
        price: 150000,
        description: "Very Much" 
    },
    {
        name: "Airpods ",
        img : 'https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlycG9kc3xlbnwwfHwwfHx8MA%3D%3D',
        price: 150000,
        description: "Very Much" 
    }
]

// i want to add this array in model and insertmany models pa lgta hai 
// ya sare moongose k method promise return krte hai and usse bcchne k liye we use async await
async function seedDB(){
    await Product.insertMany(products);
    console.log("data seeded successfully")
}

module.exports = seedDB;
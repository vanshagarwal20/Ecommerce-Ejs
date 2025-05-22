if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}




const express = require('express')
const app = express()
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed')

const ejsMate = require('ejs-mate')
const methodOveride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User')
const MongoStore = require('connect-mongo');

const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const productApi = require('./routes/api/productapi');
const paymentRoutes = require('./routes/payment');








const dbURL = process.env.dbURL;
mongoose.set('strictQuery', true);


// mongoose.connect('mongodb://127.0.0.1:27017/shopping-vansh-app')
// .then(()=>{
//     console.log('Connected to MongoDB')
// })
// .catch((err)=>{
//     console.log('Error connecting to MongoDB')
//     console.log(err)
// })

mongoose.connect(dbURL)
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));




 


app.engine('ejs',ejsMate);//yha p mena bateiya mera engine ab ejs ki file dekhiyga
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))//views folder
// public folder
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.use(methodOveride('_method'))






let secret = process.env.SECRET || 'weneedabettersecretkey';
let store = MongoStore.create({
    secret:secret,
    mongoUrl: dbURL,
    touchAfter:24*60*60
})




// session 
// let configSession = {
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     // mera ko hhtps p kaam nhi krna hai isliya secure ko commnet kr diya
//     cookie: { 
//         // secure: true 
//         httpOnly : true,
//         expires : Date.now() + 7*24*60*60*1000 ,
//         maxAge : 7*24*60*60*1000
//     }
// }
const sessionConfig = {
    store:store,
    name:'bhaukaal',
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly:true,
        expires:Date.now() + 1000*60*60*24*7,
        maxAge: 1000*60*60*24*7
    }
}


app.use(session(sessionConfig));
app.use(flash());




// passport
app.use(passport.initialize());//to use passport ki cheeza
app.use(passport.session());//to store locally
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');  
    next();
})


// passport
passport.use(new LocalStrategy(User.authenticate()));




// seeding db
// seedDB();
app.use(productRoutes);//kyuki i want to run it on every request
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(productApi);
app.use(paymentRoutes);



app.get('/' , (req,res)=>{
    res.render('home');
})



const port = 5000;

app.listen(port, () => {
    console.log(`server running at port ${port}`);
});
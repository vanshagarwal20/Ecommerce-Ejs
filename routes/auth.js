const express = require('express');
const User = require('../models/User');
const passport = require('passport');
const router = express.Router();//mini instance


// to show the form of signup 
router.get('/register',(req,res)=>{
    res.render('auth/signup');
})


// to actually want to add the user in my db with the help of plm
router.post('/register' , async (req,res)=>{
    try {
        let {username,email,password,role} = req.body;
        // passwrod nhi liya kyuki password as a separate argumnet lena hai 
        const user =  new User({username,email,role});
        // register ek static method hai isliya we can directly use it in my schema
        const newUser = await User.register(user, password);
        // res.redirect('/login')//it is not the gud way ki usko uska crednetial duabra daalne od rhae hai 
        req.login(newUser, function(err){
            if(err){return next(err)}
            req.flash('success','welcome, you are registed succesfully');
            return res.redirect('/products')
        })
    } catch(e){
        req.flash('error',e.message)
        return res.redirect('/signup')
    } 
})



// to get login form
router.get('/login',(req,res)=>{
    res.render('auth/login');
})


// most important
// to actually login via the db 
router.post('/login',
    passport.authenticate('local', {   
            failureRedirect: '/login', 
            failureMessage: true
        }),
        function(req, res) {
        // console.log(req.user);
        req.flash('success' , `welcome back ${req.user.username}`);
        // console.log(req.session);
        res.redirect(`/products`);
    });


// logout
router.get('/logout', (req, res) => {
    req.logout(()=>{
        req.flash('success' , 'goodbye friend');
        res.redirect('/login');
    });
        
});





module.exports = router;
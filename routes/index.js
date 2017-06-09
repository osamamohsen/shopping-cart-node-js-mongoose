var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function (err,docs) {
    var productChunks = [];
    var limit_width = 3;
    for(var i=0; i<docs.length ; i+= limit_width)
      productChunks.push(docs.slice(i,i+limit_width));
    res.render('shop/index', { title: 'Shopping Cart' , products: productChunks});
  });
});

router.get('/user/signup',function(req,res,next){
  var messages = req.flash('error');//{message: 'Email is already in use.'} not save message key
  res.render('user/signup',{ csrfToken: req.csrfToken() , messages: messages})
});

router.post('/user/signup',passport.authenticate('local.signup',{
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true //which added in passport.js message:Email is in use
}));

router.post('/user/signin',passport.authenticate('local.signin',{
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true //which added in passport.js message:Email is in use
}));

router.get('/user/signin',function(req,res,next){
  var messages = req.flash('error');//{message: 'Email is already in use.'} not save message key
  res.render('user/signin',{ csrfToken: req.csrfToken() , messages: messages})
});



router.get('/user/profile',function(req,res,next){
  res.render('user/profile');
});


module.exports = router;

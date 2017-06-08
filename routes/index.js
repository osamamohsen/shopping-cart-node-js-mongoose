var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var csrf = require('csurf');

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
  res.render('user/signup',{ csrfToken: req.csrfToken()})
});

router.post('/user/signup',function(req,res,next){
  res.redirect('/');
});


module.exports = router;

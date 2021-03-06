var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user,done){
    done(null,user.id);//if you want to session user save By User.id
});

passport.deserializeUser(function (id,done) {

    User.findById(id,function(err,user){
       done(err,user);
   });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email', //usernameField: core for LocalStrategy
    passwordField: 'password', // passwordField: core for LocalStrategy
    passReqToCallback: true
},function(req,email,password,done){
    req.checkBody('email','Invalid Email').notEmpty().isEmail();
    req.checkBody('password','Invalid Password').notEmpty().isLength({min: 4});
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        return done(null,false,req.flash('error',messages));
    }

    User.findOne({email:email}, function (err,user) {
        if(err){
            return done(err);
        }
        if(user){
            return done(null,false,{message: 'Email is already in use.'});
            /*
            null: meaning no errors
            false: meaning is not success
            message: meaning why is not successfull
             */
        }else{
            var newUser = new User();
            newUser.email = email;
            newUser.password = newUser.encryptPassword(password);
            newUser.save(function(err){
               if(err) {
                   throw err;
               }
                return done(null,newUser);
            });
        }
    });
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email', //usernameField: core for LocalStrategy
    passwordField: 'password', // passwordField: core for LocalStrategy
    passReqToCallback: true
},function(req,email,password,done){
    req.checkBody('email','Invalid Email').notEmpty().isEmail();
    req.checkBody('password','Invalid Password').notEmpty().isLength({min: 4});
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        return done(null,false,req.flash('error',messages));
    }

    User.findOne({email:email}, function (err,user) {
        if(err){
            return done(err);
        }
        if(!user){
            return done(null,false,{message: 'User Invalid'});
        }
        if(!user.validPassword(password)){
            return done(null,false,{message: 'Password Invalid'});
        }
        else
            return done(null,user);
    });
}));
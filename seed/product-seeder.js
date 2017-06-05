
var Product = require('../models/product');//import my schema

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/shopping" , function(error, db) {
    if(!error){
        console.log("We are connected");
    }
    else
        console.dir(error);
});


var products = [
    new Product({
        imagePath: 'https://2.bp.blogspot.com/-6wwKfFMujKo/VzInFi_J4GI/AAAAAAAAIL0/P0-vGiogAm0haWkl7kIvVbEjC8kIMQfsgCLcB/w1200-h630-p-k-no-nu/Ilustrasi%2BDrakula.jpg',
        title: 'Thumbnail label',
        description: 'Thumbnail label Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        price: 120
    }),
    new Product({
        imagePath: 'http://cdn2-www.playstationlifestyle.net/assets/uploads/gallery/call-of-duty-series/black-ops.jpg',
        title: 'Call of Duty',
        description: 'Call of Duty Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        price: 1500
    }),
    new Product({
        imagePath: 'http://assets1.ignimgs.com/2015/04/15/mortalkombatx1280jpg-c0beb6_1280w.jpg',
        title: 'Mortal Compact',
        description: 'Mortal Compact Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        price: 1250
    }),
    new Product({
        imagePath: 'http://vignette4.wikia.nocookie.net/video151/images/5/59/Destiny_The_Taken_King_Multiplayer_Gameplay_-_IGN_Live_E3_2015/revision/latest?cb=20150617002312',
        title: 'Destiny',
        description: 'Destiny Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        price: 3400
    }),
    new Product({
        imagePath: 'http://cdn.akamai.steamstatic.com/steam/apps/208650/header.jpg?t=1496257975',
        title: 'Batman Arkham',
        description: 'Batman Arkham Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        price: 5000
    }),
    new Product({
        imagePath: 'https://minecraft.net/static/pages/img/minecraft-hero.df1112867f04.jpg',
        title: 'MineCraft',
        description: 'MineCraft Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        price: 4200
    })
];

var done = 0;
for(var i=0; i<products.length; i++){
    products[i].save(function (err,res) {
        done++;
        if(done === products.length){
            exit();
        }
    });
}
function exit(){
    mongoose.disconnect();
}


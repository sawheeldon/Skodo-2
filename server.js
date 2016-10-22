/* global $ */

var express = require ('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var feed = require("feed-read");
var http = require("http");

//URLs

var url = 'http://www.bbc.co.uk/sport/football';

var expect  = require("chai").expect;
var request = require("request");
var unirest = require('unirest');

var config=require('./config');


//req schemas for players

var User = require('./models/user');

var bcrypt = require('bcryptjs');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
// var mongodbUri = 'mongodb://heroku_gdw46k4r:pevh8mhud5jk9odkq52u4m48u4@ds063406.mlab.com:63406/heroku_gdw46k4r';


//serves static files and uses json bodyparser
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// mongoose.connect(mongodbUri);
//
// var runServer = function (callback) {
//     mongoose.connect;
// };

var runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function() {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
}



//--Login of single user from login page, protected by bcrypt boom
app.post('/login', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var uname = req.body.username;
    var pwd = req.body.password;

            User.findOne({
                username:uname,
                }, function(err, items) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Internal Server Error'
                        });
                    }
                    if(!items) {
                        //bad username
                        return res.status(401).json({
                            message: 'Not found'
                        });
                    } else {
                        items.validatePassword(pwd, function(err, isValid) {
                            if (err) {
                                console.log("Check this out");
                            }
                            if (!isValid) {
                                    return res.status(401).json({
                                        message: 'Not found'
                                    });
                            } else {
                                console.log("User: " + uname + " logged in.");
                                return res.json(items);
                            }
                            //return something here
                        });
                    }
                });
});

//User endpoints

//--Updates user name
app.put('/users', function(req,res) {
    var user_id = {user_id:req.body.user_id};
    var username = {username:req.body.username};
   User.findOneAndUpdate(user_id,username, function(err,items) {
         if (err) {
             return res.status(500).json({
                 message: 'Internal Server Error'
             });
         }
         res.status(201).json(items);
   });
});

//--Removes user from DB
app.delete('/users/:id', function(req,res) {
   User.remove({
       _id: req.params.id
   }, function(err,item) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(item);
   });
});


//--Creates new user in DB from login/signup main page
app.post('/users/create', function(req, res) {
    var username = req.body.username;
    username = username.trim();
    var password = req.body.password;
    password = password.trim();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error 139'
            });
        }

        bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error 146'
                });
            }

        User.create({
            username: username,
            password: hash,
        }, function(err, item) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error 156'
                });
            }
            if(item) {
                console.log("User: " + username + " created.");
                return res.json(item);
            }
        });
        });
    });
});


exports.app = app;
exports.runServer = runServer;

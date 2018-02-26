// Fernando Guardado
// app.js - main server file

'use strict';

//variable names for dependencies
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var passport = require('passport');
var uniqueKey = process.env.UNIQUE_KEY;
var BasicStrategy = require('passport-http').BasicStrategy;
//=================================================================================
// creates app
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//=================================================================================
// authentication strategy
app.use(passport.initialize());
app.use(passport.session());
var authController = require('./auth-handler');
//=================================================================================
// verify headers and body for put, post, get, delete
function response(method, req, res) {
    // body & headers check
    if (Object.keys(req.body).length === 0) {
        res.status(400).send("The body was empty")
    }
    if (Object.keys(req.headers).length === 0) {
        res.status(400).send("The headers was empty");
    }
    else {
        res.status(200);
        res.json( {
                 message: 'Successful ' + method,
                 body: req.body,
                 headers: req.headers
                 })
    }
}
//=================================================================================
// path do deploy get
app.get('/gets', function (req, res) {
        console.log(req.body);
        if (Object.keys(req.headers).length === 0) {
        res.status(400).send("The headers was empty");
        }
        else {
        res.status(200);
        res.json( {
                 message: 'Successful gets',
                 body: req.body,
                 headers: req.headers
                 })
        }
        });
//=================================================================================
// path do deploy post
app.post('/posts', function (req, res) {
         console.log(req.body);
         response('posts', req, res);
         });
//=================================================================================
// path do deploy put
app.put('/puts', function (req, res) {
        console.log(req.body);
        response('puts', req, res);
        });
//=================================================================================
// path do deploy delete
app.delete('/deletes', authController.isAuthenticated, function (req, res) {
           console.log(req.body);
           response('deletes', req, res);
           });
//=================================================================================
// deny anything other than get, post, put & delete
app.use('*', function (req, res, next) {
        res.status(405).send({message: "Invalid method or path."});
        });
//=================================================================================
// process on local port
var port = process.env.PORT || 8080;
app.listen(port);
// console message to know what port to look at
console.log("Server on port: " + port);
//=================================================================================

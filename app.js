// Fernando Guardado
// app.js - main server file
//============================================================================================================================
'use strict';
//============================================================================================================================
//variable names for dependencies
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var passport = require('passport');
var uniqueKey = process.env.UNIQUE_KEY;
var BasicStrategy = require('passport-http').BasicStrategy;
//============================================================================================================================
// creates app
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//============================================================================================================================
// authentication
app.use(passport.initialize());
app.use(passport.session());
var auth = require('./authentication');
//============================================================================================================================
// verify headers and body
function response(method, req, res) {
    // body & headers check
    if (Object.keys(req.headers).length === 0) {
        res.status(400).send("The headers are empty. Fill and retry request.")
    }
    else if (Object.keys(req.body).length === 0) {
        res.status(400).send("The body is empty. Fill and retry request.")
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
//============================================================================================================================
// path for gets
app.get('/gets', function (req, res) {
        res.status(200);
        res.json( {
                 message: 'Successful gets',
                 body: req.body,
                 headers: req.headers
                 })
        });
//============================================================================================================================
// path for posts
app.post('/posts', function (req, res) {
         console.log(req.body);
         response('posts', req, res);
         });
//============================================================================================================================
// path for puts
app.put('/puts', function (req, res) {
        console.log(req.body);
        response('puts', req, res);
        });
//============================================================================================================================
// path for deletes
app.delete('/deletes', auth.isAuthenticated, function (req, res) {
           console.log(req.body);
           response('deletes', req, res);
           });
//============================================================================================================================
// deny other paths
app.use('*', function (req, res, next) {
        res.status(405).send({message: "This request has been rejected. Please check your request and try again."});
        });
//============================================================================================================================
// send to a certain port
var port = process.env.PORT || 8080;
app.listen(port);
//============================================================================================================================

"use strict";
const express = require("express");
const app = express();
require('dotenv').config();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const session = require('express-session');
const passport = require('passport');
require('./auth/passport');
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use('/auth', require('./auth/authRoute'));

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/auth', require('./auth/authRoute'));


//Home Page no auth needed
app.get("/", (req, res) => {
    req.session.returnTo = req.originalUrl;
    res.render("index", { title: 'Home Page', user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server listening on port: " + PORT + "!");
});
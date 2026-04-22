"use strict";
import express from 'express';
const app = express();

import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

import session from 'express-session';
import passport from 'passport';

import './auth/passport.js';
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

import  productRoutes from './routes/productRoutes.js'
import  userAppRoutes from './routes/userRoutes.js';
import authRoutes from './auth/authRoute.js';

app.use('/products', productRoutes);
app.use('/users', userAppRoutes);
app.use('/auth', authRoutes);


//Home Page no auth needed
app.get("/", (req, res) => {
    req.session.returnTo = req.originalUrl;
    res.render("index", { title: 'Home Page', user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server listening on port: " + PORT + "!");
});

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// User models
const User = require('../models/User');

// Login Page
router.get('/login', (req, res) => res.render('login'));


// Register Page
router.get('/register', (req, res) => res.render('register'));

// Register Handle
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    // Check required fields
    if(!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields'})
    }

    // Check password match
    if(password !== password2) {
        errors.push({ msg: 'Password do not match'})
    }

    // Check password length
    if(password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 charecters'})
    }

    if(errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
       User.findOne({ email: email }).then(user => {
           if(user) {
               // User exist
               errors.push({ msg: 'Email is already registerd'})
               res.render('register', {
                errors,
                name,
                email,
                password,
                password2
               })
           } else {

           }
       });
    }
});

module.exports = router;
const express =require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');
require('../config/passport')(passport);

router.post('/register', async (req, res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    User.findOne({ email: req.body.email }).then(user => {
        if(!user) {
            bcrypt.genSalt(10,  (err, salt) => {
                bcrypt.hash(newUser.password, salt,async (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save((err, doc) => {
                        if (err) {
                            console.log(err)
                        } else {
                            res.send(doc);
                        }
                    });
                });
            });
        } else {
            console.log('есть такой уже');
        }
    }).catch(err => console.log(err));
});

router.post('/login', async (req, res, next) => {
    console.log('Cookies: login ', req.cookies);
    try {
        passport.authenticate('local', {
            successRedirect: '/user/dashboard',
            failureRedirect: '/user/login',
            failureFlash: true
        })(req, res, next);
    } catch (err) {
        console.log(err);
    }
});

router.get('/dashboard', async (req, res) => {
    console.log('Cookies: dash ', req.cookies);
    try {
        res.json({ name: req.user.name });
    } catch (err) {
        res.sendStatus(500);
    }
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        await res.json(users);
    } catch (err) {
        res.sendStatus(500);
    }
});

module.exports = router;
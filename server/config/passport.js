const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done, res) => {
            // Match user
            User.findOne({
                email: email
            }).then(user => {
                if (!user) {
                    res.json({ message: 'Incorrect login' });
                    return done(null, false);
                }

                // Match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        throw err;
                    };
                    if (isMatch) {
                        res.json({ message: 'Incorrect password' });
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                });
            });
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            res.send(jwt.sign({user: user}, 'secretkey'));
            done(err, user);
        });
    });
};
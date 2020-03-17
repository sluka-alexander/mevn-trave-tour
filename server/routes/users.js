const express =require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
            res.json({ message: 'This email is already there' });
            console.log('This email is already there');
        }
    }).catch(err => console.log(err));
});

router.post('/login', async (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        console.log(user);
        if(err) {
            return res.status(500).json({
                title: 'server error',
                error: err,
            })
        }
        if(!user) {
            return res.status(401).json({
                title: 'user not found',
                error: 'invalid credentials'
            })
        }
        if(!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'login failed',
                error: 'invalid credentials'
            })
        }
        else {
            let token = jwt.sign({ userID: user._id }, 'secretkey');
            return res.status(200).json({
                title: 'login',
                token: token,
            })
        }
    })
});

router.get('/dashboard', async (req, res) => {
    let token = req.headers.token;
    jwt.verify(token, 'secretkey', (err, decoded) => {
        if(err) return res.status(401).json({
            title: 'unauthorized'
        });

        User.findOne({ _id: decoded.userID }, (err, user) => {
            if (err) return console.log(err);
            return res.status(200).json({
                title: 'user grabbed',
                user: {
                    name: user.name || 'Guest',
                    email: user.email,
                    role: user.role,
                }
            });
        });
    })
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

router.get('/:id', async (req, res)=>{
    try {
        const tour = await User.findById(req.params.id);
        await res.json(tour);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.put('/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            console.log(err)
        } else {
            user.name = req.body.name;
            user.email = req.body.email;
            user.role = req.body.role;
            user.save(err => {
                if (err) {
                    res.sendStatus(500)
                } else {
                    res.sendStatus(200)
                }
            })
        }
    })
});

// router.get('/users/:page', async (req, res) => {
//     try {
//         let perPage = 2;
//         let page = req.params.page || 1;
//         const tours = await User.find()
//             .skip((perPage * page) - perPage)
//             .limit(perPage);
//         await res.json(tours);
//     } catch (err) {
//         res.sendStatus(500);
//     }
// });

module.exports = router;
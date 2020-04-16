const express =require('express');
const router = express.Router();
const Tour = require('../models/Tour');
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken');

router.get('/', async (req, res) => {
    try {
        const tours = await Tour.find();
        await res.json(tours);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.get('/desc', async (req, res) => {
    try {
        const tours = await Tour.find().sort({ price: -1 });
        await res.json(tours);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.get('/asc', async (req, res) => {
    try {
        const tours = await Tour.find().sort({ price: 1 });
        await res.json(tours);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post('/new', verifyToken, async (req, res) => {
    try {
        jwt.verify(req.token, 'secretKey', async (err, authData) => {
            if(err) {
                res.sendStatus(403);
            }
            if(authData.role === 'admin') {
                let tour = new Tour({
                    name: req.body.name,
                    category: req.body.category,
                    description: req.body.desc,
                    price: req.body.price
                });
                await tour.save((err, doc)=>{
                    if(err) {
                        console.log(err)
                    }
                    else {
                        res.send(doc);
                    }
                });
            }
            else {
                await res.json('This is protected page')
            }
        });
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post('/:id', verifyToken, async (req, res)=>{
    try {
        jwt.verify(req.token, 'secretKey', async (err, authData) => {
            if(err) {
                res.sendStatus(403);
            }
            if(authData.role === 'admin') {
                const tour = await Tour.findById(req.params.id);
                await res.json(tour);
            }
            else {
                await res.json('This is protected page')
            }
        });
    } catch (err) {
        res.sendStatus(500);
    }
});

router.put('/:id', verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, 'secretKey', async (err, authData) => {
            if(err) {
                res.sendStatus(403);
            }
            if(authData.role === 'admin') {
                Tour.findById(req.params.id, (err, tour) => {
                    if (err) {
                        console.log(err)
                    } else {
                        tour.name = req.body.name;
                        tour.category = req.body.category;
                        tour.description = req.body.description;
                        tour.price = req.body.price;
                        tour.save(err => {
                            if (err) {
                                res.sendStatus(500);
                            } else {
                                res.sendStatus(200)
                            }
                        })
                    }
                })
            }
            else {
                await res.json('This is protected page')
            }
        });
    } catch (err) {
        res.sendStatus(500);
    }
});

router.delete('/:id', verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, 'secretKey', async (err, authData) => {
            if(err) {
                res.sendStatus(403);
            }
            if(authData.role === 'admin') {
                Tour.remove({ _id: req.params.id }, err => {
                    if (err) {
                        res.sendStatus(500)
                    } else {
                        res.sendStatus(200)
                    }
                })
            }
            else {
                await res.json('This is protected page')
            }
        });
    } catch (err) {
        res.sendStatus(500);
    }
});

module.exports = router;
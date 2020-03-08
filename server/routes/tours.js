const express =require('express');
const router = express.Router();
const Tour = require('../models/Tour');

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

router.post('/new', async (req, res) => {
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
});

router.get('/:id', async (req, res)=>{
    try {
        const tour = await Tour.findById(req.params.id);
        await res.json(tour);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.put('/:id', (req, res) => {
    Tour.findById(req.params.id, (err, tour) => {
        if (err) {
            console.log(err)
        } else {
            tour.name = req.body.name;
            tour.category = req.body.category;
            tour.description = req.body.desc;
            tour.price = req.body.price;
            tour.save(err => {
                if (err) {
                    res.sendStatus(500)
                } else {
                    res.sendStatus(200)
                }
            })
        }
    })
});

router.delete('/:id', (req, res) => {
    Tour.remove({ _id: req.params.id }, err => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.sendStatus(200)
        }
    })
});

module.exports = router;
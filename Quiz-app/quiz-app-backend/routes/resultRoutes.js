const express = require('express');
const Result = require('../models/Result');

const router = express.Router();

// Route to submit quiz result
router.post('/submit', async (req, res) => {
    try {
        const newResult = new Result(req.body);
        await newResult.save();
        res.status(201).json(newResult);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Route to get results for a specific user
router.get('/:userId', async (req, res) => {
    try {
        const results = await Result.find({ userId: req.params.userId });
        res.json(results);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;

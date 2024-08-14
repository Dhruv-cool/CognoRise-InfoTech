const express = require('express');
const Question = require('../models/Questions');

const router = express.Router();

// Route to get all questions in a specific category
router.get('/:category', async (req, res) => {
    try {
        const questions = await Question.find({ category: req.params.category });
        res.json(questions);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;

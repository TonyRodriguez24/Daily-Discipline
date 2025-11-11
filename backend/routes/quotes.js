const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const response = await fetch('https://zenquotes.io/api/quotes/');
        const data = await response.json();
        res.json(data);
    } catch (err) {
        next(err);
    }
});

module.exports = router; // ✅ make sure you export the router
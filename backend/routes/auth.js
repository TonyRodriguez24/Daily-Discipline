const express = require('express')
const router = new express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ExpressError = require('../expressError')
const db = require('../db');
const { SECRET_KEY } = require('../config');

router.post('/register', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) throw new ExpressError(`Username and password required`, 400)
        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await db.query(`INSERT INTO users (username, password) VALUES ($1, $2) RETURNING username`, [username, hashedPassword])
        return res.status(201).json(result.rows[0])
    } catch (error) {
        if (error.code === '23505') return next(new ExpressError('Username taken, please pick another', 400)) //postgress error code is 23505 and we look for that
        return next(error)
    }


})

router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) throw new ExpressError(`Username and password required`, 400) //400 bad request
        const result = await db.query(`SELECT * FROM users WHERE username = $1`, [username])
        const user = result.rows[0];
        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                //create json web token
                const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY)
                return res.json({ message: "logged in", token })
            }
        }
        throw new ExpressError('Invalid username/password', 400)
    } catch (error) {
        return next(error)
    }
})

module.exports = router;
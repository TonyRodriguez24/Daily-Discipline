const express = require('express')
const router = new express.Router();
const Log = require('../models/log')
const { authenticateJWT } = require('../middleware/auth')

router.use(authenticateJWT)

//creates a daily log
router.post('/', async (req, res, next) => {
    try {
        const userId = req.user.id;
        const {date, didWorkout, sleepHours, githubCommits, screenTime, weight} = req.body
        const newLog = await Log.createLog(userId, date, didWorkout, sleepHours, githubCommits, screenTime, weight)
        return res.status(201).json(newLog)
    } catch (error) {
    return next(error)        
    }
})

//gets all logged for a logged in user
router.get('/', async (req, res, next) => {
    try {
        const userId = req.user.id;
        const logs = await Log.getAll(userId);
        return res.status(200).json(logs)
    } catch (error) {
        return next(error)
    }

})

//get log by date
router.get('/:date', async (req, res, next) => {
    try {
        const userId = req.user.id;
        const date = req.params.date;
        const log = await Log.getLogById(userId, date)
        return res.json(log)
    } catch (error) {
        return next(error)
    }
})


router.patch('/:date', async (req, res, next) => {
    try {
        const userId = req.user.id
        const date = req.params.date
        const { didWorkout, sleepHours, githubCommits, screenTime, weight } = req.body
        const updatedLog = await Log.updateLog(userId, date, {didWorkout, sleepHours, githubCommits, screenTime, weight} )
        return res.json(updatedLog)
    } catch (error) {
        return next(error)
    }
})

module.exports = router;

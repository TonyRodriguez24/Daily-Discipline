const express = require('express')
const router = new express.Router();
const Log = require('../models/log')
const { authenticateJWT } = require('../middleware/auth')

router.use(authenticateJWT)

//creates a daily log
router.post('/', async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { date, didWorkout, sleepHours, githubCommits, screenTime, weight } = req.body

        function parseNumber(value) {
            const num = parseFloat(value)
            return isNaN(num) ? null : num;
        }
        const sleepHoursNum = parseNumber(sleepHours);
        const githubCommitsNum = parseNumber(githubCommits);
        const screenTimeNum = parseNumber(screenTime);
        const weightNum = parseNumber(weight);

        const newLog = await Log.createLog(userId, date, didWorkout, sleepHoursNum, githubCommitsNum, screenTimeNum, weightNum)
        console.log(newLog)
        return res.status(201).json(newLog)
    } catch (error) {
        console.log(error)
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

//get log by log id
router.get('/:id', async (req, res, next) => {
    try {
        const userId = req.user.id;
        const id = req.params.id;
        const log = await Log.getLogById(userId, id)
        return res.json(log)
    } catch (error) {
        return next(error)
    }
})

//edit a log by log id
router.patch('/:id', authenticateJWT, async (req, res, next) => {
    try {
        const userId = req.user.id;       
        const logId = req.params.id;      
        const updatedLog = await Log.updateLog(userId, logId, req.body);
        return res.json({ log: updatedLog });
    } catch (err) {
        return next(err);
    }
});

//delete a log by id 
router.delete('/:id', authenticateJWT, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const logId = req.params.id;
        const deletedLog = await Log.deleteLog(userId, logId)
        return res.json({log: deletedLog})
    } catch (error) {
        return next(error)
    }
})

module.exports = router;

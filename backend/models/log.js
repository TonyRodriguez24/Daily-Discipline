const db = require('../db');
const ExpressError = require('../expressError');


//id, user_id, date, did_workout, sleep_hours, github_commits, screen_time

class Log {
    static async getAll(userId) {
        const result = await db.query(
            `SELECT id, date, did_workout, sleep_hours, github_commits, screen_time, weight
            FROM daily_logs
            WHERE user_id = $1`, [userId])
        return result.rows;
    }

    static async createLog(userId, date, didWorkout, sleepHours, githubCommits, screenTime, weight) {
        const result = await db.query(
            `INSERT INTO daily_logs (user_id, date, did_workout, sleep_hours, github_commits, screen_time, weight)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
             `, [userId, date, didWorkout, sleepHours, githubCommits, screenTime, weight])
        return result.rows[0];
    }

    static async getLogById(userId, date) {
        const result = await db.query(
            `SELECT date, did_workout, sleep_hours, github_commits, screen_time, weight
            FROM daily_logs
            WHERE user_id=$1 AND date=$2`, [userId, date])
        if(result.rows.length === 0) throw new ExpressError('No log was found for this date', 400)
        return result.rows[0]
    }

    static async updateLog(userId, date, fields = {}) {
        const values = []
        const baseQuery = ''
        
        const result = await db.query(`UPDATE daily_logs SET  RETURNING *`)
        return result.rows[0]
    }


}

module.exports = Log;
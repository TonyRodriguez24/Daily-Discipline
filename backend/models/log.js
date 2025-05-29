const db = require('../db')


//id, user_id, date, did_workout, sleep_hours, github_commits, screen_time

class Log {
    static async getAll(userId) {
        const result = await db.query(
            `SELECT date, did_workout, sleep_hours, github_commits, screen_time 
            FROM daily_logs
            WHERE user_id = $1`, [userId])
        return result.rows;
    }

    static async createLog(userId, date, didWorkout, sleepHours, githubCommits, screenTime) {
        const result = await db.query(
            `INSERT INTO daily_logs (user_id, date, did_workout, sleep_hours, github_commits, screen_time)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
             `, [userId, date, didWorkout, sleepHours, githubCommits, screenTime])
        return result.rows[0];
    }


}

module.exports = Log;
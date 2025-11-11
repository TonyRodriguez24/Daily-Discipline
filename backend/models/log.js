const db = require('../db');
const ExpressError = require('../expressError');

// id, user_id, date, did_workout, sleep_hours, github_commits, screen_time, weight
class Log {
    static async getAll(userId) {
        const result = await db.query(
            `SELECT id, date, did_workout, sleep_hours, github_commits, screen_time, weight
       FROM daily_logs
       WHERE user_id = $1
       ORDER BY date DESC`,
            [userId]
        );
        return result.rows;
    }

    static async createLog(userId, date, didWorkout, sleepHours, githubCommits, screenTime, weight) {
        const result = await db.query(
            `INSERT INTO daily_logs
        (user_id, date, did_workout, sleep_hours, github_commits, screen_time, weight)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
            [userId, date, didWorkout, sleepHours, githubCommits, screenTime, weight]
        );
        return result.rows[0];
    }

    static async getLogById(userId, id) {
        const result = await db.query(
            `SELECT date, did_workout, sleep_hours, github_commits, screen_time, weight
       FROM daily_logs
       WHERE user_id = $1 AND id = $2`,
            [userId, id]
        );

        if (result.rows.length === 0)
            throw new ExpressError('No log was found for this id', 400);

        return result.rows[0];
    }

    static async updateLog(userId, id, fields = {}) {
        const keys = Object.keys(fields);
        if (keys.length === 0) throw new ExpressError("No data provided", 400);

        // Dynamically build the SET clause
        const cols = keys.map((col, idx) => `${col} = $${idx + 3}`).join(", ");

        const query = `
      UPDATE daily_logs
      SET ${cols}
      WHERE user_id = $1 AND id = $2
      RETURNING *`;

        const values = [userId, id, ...Object.values(fields)];

        const result = await db.query(query, values);

        if (result.rows.length === 0)
            throw new ExpressError("No log found to update", 404);

        return result.rows[0];
    }

    static async deleteLog(userId, id) {
        const result = await db.query(`DELETE FROM daily_logs where user_id = $1 AND id = $2 RETURNING id`, [userId, id])
        return result.rows[0]
    }
}

module.exports = Log;

const { Pool } = require("pg");
const { DB_URI } = require("./config");

// Create a Postgres pool using your Supabase DATABASE_URL
const pool = new Pool({ connectionString: DB_URI });

// Export the pool for your app to use
module.exports = pool;

// Optional: test connection only when running this file directly
if (require.main === module) {
    (async () => {
        try {
            const res = await pool.query("SELECT NOW()");
            console.log("Connected to Supabase! Server time:", res.rows[0]);
            await pool.end();
        } catch (err) {
            console.error("Connection failed:", err);
        }
    })();
}

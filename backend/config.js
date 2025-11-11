require("dotenv").config();

const DB_URI =
    process.env.DATABASE_URL ||
    (process.env.NODE_ENV === "test"
        ? "postgresql:///daily_discipline_test"
        : "postgresql:///daily_discipline");

const SECRET_KEY = process.env.SECRET_KEY || "fallback-secret-key";

module.exports = { DB_URI, SECRET_KEY };

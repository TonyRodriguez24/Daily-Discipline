require("dotenv").config();

const DB_URI = process.env.DATABASE_URL || (
    process.env.NODE_ENV === "test"
        ? "postgresql:///DBNAME_test"
        : "postgresql:///daily_discipline"
);


const SECRET_KEY = 'verysecretivekey';


module.exports = { DB_URI, SECRET_KEY }
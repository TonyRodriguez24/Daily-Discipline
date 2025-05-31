const express = require('express')
const app = express();
const logsRoutes = require('./routes/logs')
const authRoutes = require('./routes/auth')

const ExpressError = require('./expressError')
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes)
app.use('/logs', logsRoutes);


//404 error handler
app.use((req, res, next) => {
    const error = new ExpressError("Not found", 404)
    return next(error)
})

//General error handler
app.use((error, req, res, next) => {
    let status = error.status || 500;
    return res.status(status).json({
        error: {
            message: error.message,
            status: status
        }
      });
})

module.exports = app;
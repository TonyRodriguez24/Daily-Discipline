const jwt = require('jsonwebtoken')
const {SECRET_KEY} = require('../config')
const ExpressError = require('../expressError')

const authenticateJWT = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1]
        const payload = jwt.verify(token, SECRET_KEY);
        req.user = payload;
        
        return next()
    } catch (error) {
        console.log("Auth header:", req.headers.authorization);

        return next(new ExpressError('Unauthorized', 401))
    }
}

module.exports = {authenticateJWT};
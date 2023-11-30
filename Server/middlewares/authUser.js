
const jwt = require('jsonwebtoken');
// const Cookies = require('js-cookie');
// const cookieParser = require('cookie-parser');
require('dotenv').config();
// app.use(cookieParser());

async function authUser(req, res, next) {
    try {
        const authorizationHeader = req.headers['authorization'];
        if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
            const accessToken = authorizationHeader.substring('Bearer '.length);        
            const user = jwt.verify(accessToken, process.env.SECRET_KEY);
            // console.log("jimsxmkalcska",user)
            if (user.email) {
                req.user = user;
                next();
            } else {
                res.status(401).json("Unauthorized");
            }
        } else {
            res.status(401).json("You need to include a valid Authorization header with a Bearer token");
        }
    } catch (error) {
        res.status(400).json(error);
    }
};

module.exports = {
    authUser
};

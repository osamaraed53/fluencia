// const jwt = require('jsonwebtoken');
// // const Cookies = require('js-cookie');
// // const cookieParser = require('cookie-parser');
// require('dotenv').config();
// // app.use(cookieParser());

// async function authorize(req, res, next){
//     try{
//         const tokenCookie = req.headers.cookie;
//         // const token = req.headers['authorization'];
//         if (tokenCookie) {
//             const cookiesArray = tokenCookie.split(';');
//             const accessTokenCookie = cookiesArray.find(cookie => cookie.trim().startsWith('accessToken='));
//             if (accessTokenCookie) {
//                 const accessToken = accessTokenCookie.split('=')[1].trim();
//                 console.log(accessToken);
//                 const user = jwt.verify(accessToken, process.env.SECRET_KEY);
//                 console.log(user)
//                 if(user.email){
//                     req.user = user;
//                     next();
//                 }else{
//                     res.status(401).json("unauthorized");
//                 }
//                 console.log(user);
//             }
//         }else {
//             res.status(401).json("you need to login first");
//         }
//     }catch(error){
//         res.status(400).json(error);
//     }
// };

// module.exports = {
//     authorize
// };




const jwt = require('jsonwebtoken');
// const Cookies = require('js-cookie');
// const cookieParser = require('cookie-parser');
require('dotenv').config();
// app.use(cookieParser());

async function authorize(req, res, next) {
    try {
        const authorizationHeader = req.headers['authorization'];
        if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
            const accessToken = authorizationHeader.substring('Bearer '.length);        
            const user = jwt.verify(accessToken, process.env.SECRET_KEY);
            // console.log("jimsxmkalcska",user)
            if (user.role) {
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
    authorize
};

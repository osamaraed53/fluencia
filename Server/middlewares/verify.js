

require("dotenv").config();

const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Token not provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
}

module.exports = {
  verifyJWT,
};

//______________________________________________________________

// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// async function verifyJWT(req, res, next) {
//   try {
//     const token = res.cookies.token;
//     if ("token" == null) {
//       res.clearCookie("token");
//       res.status(401).json("you need to login first");
//     } else {
//       const user = jwt.verify(token, process.env.SECRET_KEY);
//       if (!user.id) {
//         res.status(401).json("unauthorized");
//       }
//       req.user = user;
//       //   next();
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(400).json(error);
//   }
// }

// module.exports = {
//     verifyJWT,
// };


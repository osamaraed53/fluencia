const db = require("../models/db");
const jwt = require("jsonwebtoken");
const passport = require("passport");
// require("../Middleware/authorization");
require("../middlewares/authgoogle");





function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
  }
  
  exports.getuser = (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
  };
  
  exports.getauthenticate = passport.authenticate("google", {
    scope: ["email", "profile"],
  });
  
  exports.callback = passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/google/failure",
  });


  
  
    

  
  
  exports.protected =
    (isLoggedIn,
    async  (req, res) => {
      console.log( req.user)

      if (req.user) {
        try {
          const { displayName, emails, id } = req.user;
  
          const username = displayName;
          const email = emails[0].value;
          const checkEmailQuery = "SELECT * FROM users WHERE email = $1";
          const emailCheck = await db.query(checkEmailQuery, [email]);
  
          if (emailCheck.rows.length > 0) {
            const payload = {
              username: username,
              email: email,
              role_id: emailCheck.rows[0].role_id,
              id: emailCheck.rows[0].id,
            };
  
            const secretKey = process.env.SECRET_KEY;
            const token = jwt.sign(payload, secretKey, { expiresIn: "7d" });
            res.status(200).json({id,username,email,
              message: "User logged in successfully",
              token: token,
            });
            // console.log(token)
          } else {
            
            const password = "No Access";
            
            const query =
            "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)";
            const values = [
              displayName,
              "",
              email,
              password,
              
             
            ];
            await db.query(query, values);
            const payload = {
              email: email,
              user_id: id,
            };
  
            const secretKey = process.env.SECRET_KEY;
            const token = jwt.sign(payload, secretKey, { expiresIn: "7d" });
            res.cookie("accessToken", token, { httpOnly: true });

            res.status(200).json({
              logmessage: "User added successfully",
              token: token,
              displayName: displayName,
            });
            console.log(token)
          }
        } catch (error) {
          console.error("Error saving user information to PostgreSQL:", error);
          res.status(500).send("Internal Server Error");
        }
      } else {
        res.sendStatus(401);
      }
    });
  
  exports.logout = (req, res) => {
    req.logout(() => {
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
        }
        res.send("Goodbye!");
      });
    });
  };
  
  exports.fail = (req, res) => {
    res.send("Failed to authenticate..");
  };
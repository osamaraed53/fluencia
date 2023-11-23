const { Router } = require("express");
const googleController = require("../controllers/goolgeController");
const router = Router();



router.get("/google", googleController.getuser);                        /// this endpoint for google button
router.get("/auth/google", googleController.getauthenticate);
router.get("/google/callback", googleController.callback);
router.get("/protected", googleController.protected);
router.get("/logout", googleController.logout);
router.get("/auth/google/failure", googleController.fail);


module.exports = router;
const express = require("express");
const userController = require("../controllers/usersController");
const router = express.Router();
const multer = require('multer');
const upload = multer();
//  const verify= require('../middlewares/verify')
const authorize= require('../middlewares/authorization')

router.post("/signup",userController.signup);
router.post("/login",userController.login );
router.put("/updateUser",authorize.authorize,userController.updateUser );



router.put("/submitTask/:users_task_id",authorize.authorize,userController.imageProduct,userController.submitTask );



module.exports = router;
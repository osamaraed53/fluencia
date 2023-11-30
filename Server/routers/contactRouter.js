const express = require("express");
const contactController = require("../controllers/contactController");
const router = express.Router();

//  const verify= require('../middlewares/verify')
const authorize= require('../middlewares/authorization')

router.post("/submitContactUs",authorize.authorize,contactController.submitContactUs);
router.get("/getContactUsData",contactController.getContactUsData);
router.delete("/deleteContactUs/:contact_id",contactController.deleteContactUs);












module.exports = router;
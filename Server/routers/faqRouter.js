const express = require("express");
const faqController = require("../controllers/faqController.js");
const router = express.Router();



router.get("/getQuestion/:faq_id",faqController.getQuestion);
router.put("/deleteQuestion/:faq_id",faqController.deleteQuestion);
router.put("/restoreQuestion/:faq_id",faqController.restoreQuestion);
router.put("/UpdateQuestion/:faq_id",faqController.UpdateQuestion);
router.post("/addQuestion",faqController.addQuestion);
router.get("/getAllQuestion",faqController.getAllQuestion);

module.exports = router;
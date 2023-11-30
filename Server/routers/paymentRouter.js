const express = require("express");
const paymentController = require("../controllers/paymentController");
const router = express.Router();
const path = require('path');
const authUser= require('../middlewares/authUser')
const bodyparser= require('body-parser')

router.use(bodyparser.json());
router.use(bodyparser.urlencoded({ extended: false }));


// router.set('view engine','ejs');
// router.set('views',path.join(__dirname, '../views'));

router.post("/create-customer",authUser.authUser,paymentController.createCustomer);
router.post("/createCustomer2Months",authUser.authUser,paymentController.createCustomer2Months);
router.post("/createCustomer3Months",authUser.authUser,paymentController.createCustomer3Months);
router.post("/add-card",paymentController.addNewCard);
router.post("/create-charges",paymentController.createCharges);


// router.get('/', paymentController.renderBuyPage);
// // router.get('/create-checkout-session', paymentController.payment);
// router.get('/success', paymentController.success);
// router.get('/failure', paymentController.failure);






module.exports = router;





//------------------------------------------------------------














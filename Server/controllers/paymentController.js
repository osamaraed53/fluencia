require("dotenv").config();

const { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } = process.env;

const stripe = require('stripe')(STRIPE_SECRET_KEY)

const createCustomer = async(req,res)=>{
    console.log("dfghjkl;lkjhgf")

    try {
const user_id = req.user.user_id


const checkoutObject = {
    payment_method_types: ['card'],
    line_items: [{
      price: "price_1OHQVkDlQnoZqAI2eJRY98f2",
      quantity: 1,
    }],
    mode: 'subscription',
  };
        const customer = await stripe.customers.create({
            name:req.user.name,
            email:req.user.email,
            metadata: {
                user_id: user_id,
              },
        });

console.log(customer)
const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    success_url: 'https://localhost:3000/success',
    cancel_url: 'https://localhost:3000/cancel',
    line_items: checkoutObject.line_items,
    mode: checkoutObject.mode,
    subscription_data: checkoutObject.subscription_data,
  });

  res.json({ id: session.id }); ///must use this front end becouse when use it will redirect to on stripe forms
        
    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
        console.log("dfghjkl;lkjhgf")

    }

}
    
const createCustomer2Months = async(req,res)=>{
    console.log("dfghjkl;lkjhgf")

    try {
const user_id = req.user.user_id


const checkoutObject = {
    payment_method_types: ['card'],
    line_items: [{
      price: "price_1OHQVkDlQnoZqAI2JM68cyzD",
      quantity: 1,
    }],
    mode: 'subscription',
  };
        const customer = await stripe.customers.create({
            name:req.user.name,
            email:req.user.email,
            metadata: {
                user_id: user_id,
              },
        });

console.log(customer)
const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    success_url: 'https://localhost:3000/success',
    cancel_url: 'https://localhost:3000/cancel',
    line_items: checkoutObject.line_items,
    mode: checkoutObject.mode,
    subscription_data: checkoutObject.subscription_data,
  });

  res.json({ id: session.id }); ///must use this front end becouse when use it will redirect to on stripe forms
        
    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
        console.log("dfghjkl;lkjhgf")

    }

}

const createCustomer3Months = async(req,res)=>{
    console.log("dfghjkl;lkjhgf")

    try {
const user_id = req.user.user_id


const checkoutObject = {
    payment_method_types: ['card'],
    line_items: [{
      price: "price_1OHQVkDlQnoZqAI2KXB62Lh6",
      quantity: 1,
    }],
    mode: 'subscription',
  };
        const customer = await stripe.customers.create({
            name:req.user.name,
            email:req.user.email,
            metadata: {
                user_id: user_id,
              },
        });

console.log(customer)
const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    success_url: 'https://localhost:3000/success',
    cancel_url: 'https://localhost:3000/cancel',
    line_items: checkoutObject.line_items,
    mode: checkoutObject.mode,
    subscription_data: checkoutObject.subscription_data,
  });

  res.json({ id: session.id }); ///must use this front end becouse when use it will redirect to on stripe forms
        
    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
        console.log("dfghjkl;lkjhgf")

    }

}

const addNewCard = async(req,res)=>{

    try {

        const {
            customer_id,
            card_Name,
            card_ExpYear,
            card_ExpMonth,
            card_Number,
            card_CVC,
        } = req.body;

        const card_token = await stripe.tokens.create({
            card:{
                name: card_Name,
                number: card_Number,
                exp_year: card_ExpYear,
                exp_month: card_ExpMonth,
                cvc: card_CVC
            }
        });

        const card = await stripe.customers.createSource(customer_id, {
            source: `${card_token.id}`
        });

        res.status(200).send({ card: card.id });

    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }

}




const createCharges = async(req,res)=>{

    try {

        const createCharge = await stripe.charges.create({
            receipt_email: 'tester@gmail.com',
            amount: parseInt(req.body.amount)*100, //amount*100
            currency:'INR',
            card: req.body.card_id,
            customer: req.body.customer_id
        });

        res.status(200).send(createCharge);

    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }

}


module.exports = {
    createCustomer,
    addNewCard,
    createCharges,
    createCustomer2Months,
    createCustomer3Months
}









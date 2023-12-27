const db = require("../models/db");

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
    success_url: 'https://localhost:3001/',
    cancel_url: 'http://localhost:3001/',
    line_items: checkoutObject.line_items,
    mode: checkoutObject.mode,
    subscription_data: checkoutObject.subscription_data,
  });


  res.json({ id: session.id }); 
  await updateIsPayToTrue(req.user.user_id);
   
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
    success_url: 'http://localhost:3001/',
    cancel_url: 'http://localhost:3001/',
    line_items: checkoutObject.line_items,
    mode: checkoutObject.mode,
    subscription_data: checkoutObject.subscription_data,
  });

  res.json({ id: session.id }); 
  await updateIsPayToTrue(req.user.user_id);

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
    success_url: 'http://localhost:3001/',
    cancel_url: 'http://localhost:3001/',
    line_items: checkoutObject.line_items,
    mode: checkoutObject.mode,
    subscription_data: checkoutObject.subscription_data,
  });

  res.json({ id: session.id }); 
  await updateIsPayToTrue(req.user.user_id);

    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
        console.log("dfghjkl;lkjhgf")

    }

}








async function updateIsPayToTrue(userId) {
    try {
      const query = 'UPDATE users SET is_pay = $1 WHERE user_id = $2';
      await db.query(query, [true, userId]);
      console.log(`is_pay for user ${userId} updated to true`);
    } catch (error) {
      console.error('Error updating is_pay:', error);
      throw error;
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
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv").config();

// Stripe init
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);
// coinbase init
var coinbase = require("coinbase-commerce-node");
var Client = coinbase.Client;
var resources = coinbase.resources;

Client.init(process.env.COINBASE_API_KEY);

//paypal init
const paypal = require('paypal-rest-sdk');
paypal.configure({
    'mode': 'sandbox', 
    'client_id': '####yourclientid######',
    'client_secret': '####yourclientsecret#####'
    });

// coinbase routing
router.post("/checkout", async (req, res) => {
    const { amount, currency } = req.body;
    console.log('gtgtegfrte');
    try {
         const charge = await resources.Charge.create({
                name: "Billion Dollar,",
                description: "Provides Option For All Type Of Payment",
                local_price: {
                      amount: amount, 
                      currency: currency,
                },
                pricing_type: "fixed_price",
                metadata: {
                user_id: "3434"
                },
    });
    
    res.status(200).json({
    charge: charge,
    });
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
})


//paypal routing
router.post('/pay', (reg, res) => {
  const create_payment_json = {
  "intent":"sale",
  "paver": {
  "payment_method": "paypal"
  },
  "redirect_urls": {
  "return_url": "http://localhost: 3000/success",
  "cancel_url": "http://localhost: 3000/cancel"
  }, 
  "transactions": [{
  "item list": {
  "items": [{
  "name": "Red Sox Hat",
  "sku": "001",
  "price": "25.00",
  "currency": "USD",
  "guantity": 1
  }]
  },
  "amount": {
      "currency": "USD",
      "total": "25.00",
  },
      "description": "Hat for the best team ever"
  }]
}
paypal.payment.create(create_payment_json, function (error){
  if (error) {
  throw error;
  } else {
  for (let i = 0;i < payment. links. length;i++) {
       if(payment. links[i].rel === 'approval _ur]'){
       res.redirect(payment.links [i].href);
       }  
  }
  }
  });

});


router.get('/success', (req, res) => {
  const payerId = req.query. PayerID;
  const paymentId = req. query.paymentId;
  const execute_payment_json = {
  "payer_id": payerId,
  "transactions": [{
  "amount": {
  "currency": "INR",
  "total": "25.00"
  }
  }]
};
paypal.payment.execute(paymentId, execute_payment_json,function(error,payment){
  if (error) {
  console.log(error .response);
  throw error;
  } else {
  console. log (JSON.stringify (payment)) ;
  res.send ('Success');
  }
})
})

router.get ('/cancel', (req, res) => res.send('Cancelled'));

//stripe routing
router.post("/", async (req, res) => {
  try {
    const { amount } = req.body;

    const customer = await stripe.customers.create({
      metadata: {
        amount: amount,
      },
    });

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Your Product Name",
              metadata: {
                id: "Your Product ID",
              },
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}image`,
    //   cancel_url: `${process.env.CLIENT_URL}/paymentFail`,
    });



    res.send({ url: session.url });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Failed to create payment intent" });
  }
});







module.exports = router;

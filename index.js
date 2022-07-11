const mongoose = require('mongoose');
const express = require('express');
const loginsControllers = require('./controllers/logins.js');
const mealsControllers = require('./controllers/meals.js')
const cors = require('cors');
require('dotenv').config();




mongoose.connect(
    "mongodb+srv://CEMS_admin:emmajZOz1b10Hyh0@cems.5le7maf.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true }
).then(()=>{
    const app = express()
    app.use(express.json());
    app.use(cors({
        origin: "*",
        methods: ["GET", "POST", "PATCH","DELETE"]
    }))
    app.post('/create-account', loginsControllers.createNewUser);
    app.post('/login', loginsControllers.login);
    app.post('/check-number', loginsControllers.checkNumber);
    app.post('/get-user-data', loginsControllers.loginById);
    app.get('/get-location/:id', loginsControllers.getLocation);
    app.post('/add-meal', mealsControllers.addFood )
    app.get('/specials', mealsControllers.getSpecials);
    app.get('/filter/:type', mealsControllers.filterByType);
    app.get('/get-cart/:id', loginsControllers.getCart);
    app.post('/update-cart', loginsControllers.updateCart);
    app.get('/get-cart-number/:id', loginsControllers.getCartNumber);
    app.get('/get-three-random', mealsControllers.getThreeRandom);
    app.get('/get-one/:id', mealsControllers.findOne);
    app.post('/get-specific-ids', mealsControllers.getSpecificIds);
    app.get('/get-price/:id', mealsControllers.getPrice);
    app.get('/get-phone/:id', loginsControllers.getPhone);
    app.get('/add-quantity', mealsControllers.addQuantity);
    app.listen(process.env.PORT || 8000, ()=>{
        console.log("server on port 8000");
    })
})
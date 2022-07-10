const customers = require("../models/customers.js");
const bcrypt = require("bcrypt");




exports.createNewUser = async (req, res)=> {
    try {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new customers({
            userName : req.body.name,
            phone: req.body.phone,
            password : hashPassword,
            cart: [],
            location: 'nakuru'
        })

        await newUser.save()
        res.send(newUser)
    }
    catch {
        res.send(false)
    }
}

exports.login = async (req,res)=>{
    const user = await customers.findOne({phone: req.body.phone})
    if(user === null ){
        res.send("phone number not linked to any account")
    }else{
        if( await bcrypt.compare(req.body.password, user.password)){
            res.send(user)
        }
        else {
            res.send(false)
        }
    }
}

exports.checkNumber = async (req,res)=>{
    const user = await customers.findOne({ phone: req.body.phone})
    if(user != null){
        res.send(true)
    }else {
        res.send(false)
    }
}

exports.getPhone = async (req, res)=>{
    try{
        const user = await customers.findById(req.params.id)
        const phone = {
            phone : user.phone
        }
        res.send(phone)
    }
    catch {
        res.send(false)
    }
}


exports.getLocation = async (req, res)=>{
    try{
        const user = await customers.findById(req.params.id);
        const location = user.location
        const data = {
            location : location
        }
        res.send(data)
    }
    catch {
        res.send(false)
    }
}
exports.loginById = async (req,res)=>{
    try {
        const user = await customers.findById(req.body.userID);
        res.send(user);
    }
    catch {
        res.send(false)
    }
}

exports.getCart = async (req, res)=>{
    const user = await customers.findById(req.params.id)
    if( user != null){
        const cart = user.cart;
        res.send(cart)
    }
    else {
        res.send("not found")
    }
}
exports.getCartNumber = async (req, res)=>{
    try {
        const user = await customers.findById(req.params.id);
        const cart = user.cart;
        const data = {
            length : cart.length
        }
        res.send(data)
    }
    catch {
        res.send(false)
    }
}

exports.updateCart = async (req,res)=>{
    try{
        const user = await customers.findOneAndUpdate({_id: req.body.id}, {$set: {cart: req.body.newCart}});
        res.send(true)
    }
    catch {
        res.send(false)
    }
}
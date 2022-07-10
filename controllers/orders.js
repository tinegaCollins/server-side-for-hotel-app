const order = require('../models/orders.js')


exports.addOrders = async (req,res)=>{
    try{
        order.insertMany(req.body.orders)
        res.send('added')
    }
    catch{
        res.send("not sent")
    }
}
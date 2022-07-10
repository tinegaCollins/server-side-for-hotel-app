const meals = require("../models/meals.js");


exports.getSpecials = async (req,res)=>{
    const specials = await meals.find({ special : true })
    if( specials != null){
        res.send(specials)
    }
    else{
        res.send("could not found the requeste items ")
    }
}

exports.findOne = async (req,res)=>{
    const one = await meals.findById(req.params.id)
    if(one != null){
        res.send(one)
    }
    else{
        res.send("not found")
    }
}


exports.addFood = async (req,res)=>{
    try{
        const newMeal = new meals({
            name: req.body.name,
            image: req.body.image,
            type: req.body.type,
            price: req.body.price,
            special: req.body.special
        })
        await newMeal.save();
        res.send(true);
    }
    catch{
        res.send(false)
    }
}

exports.filterByType = async (req, res)=>{
    try {
        const filter = await meals.find({type: req.params.type});
        res.send(filter)
    }
    catch {
        res.send("could not find the requested items")
    }
}

exports.getThreeRandom = async (req,res)=>{
    const all = await meals.find({})
    const random = Math.floor(Math.random() * all.length)
    const random2 = Math.floor(Math.random() * all.length)
    const random3 = Math.floor(Math.random() * all.length)
    res.send([all[random], all[random2], all[random3]])
}

exports.getSpecificIds = async (req,res)=>{
    const ids = req.body.ids;
    const tosend = await meals.find({_id: {$in: ids}})
    res.send(tosend)
}

exports.getPrice = async(req,res)=>{
    try{
        const item = await meals.findById(req.params.id);
        const priceToSend = {
            price : item.price
        }
        res.send(priceToSend)
    }
    catch {
        res.send('error')
    }
}


const randomSixNumbers  = (a,b)=>{
    let numbers = [];
    while(numbers.length < 6){
        let curNumber = newNumber(a,b);
        let index = numbers.indexOf(curNumber);
        if(index === -1){
            numbers.push(curNumber);
        }
        numbers.length + 1
    }
    return numbers
}

function newNumber(a, b) {
    return Math.floor(Math.random(a, b) * b);
}
const switchSpecials = async ()=>{
    const specials = await meals.find({ special : true})
    for (let j = 0; j < specials.length; j++) {
        specials[j].special = false;
        await specials[j].save()
    }
    const all = await meals.find();
    const randomNumbers = randomSixNumbers(0,all.length);
    let i = 0;
    while(i < randomNumbers.length){
        all[randomNumbers[i]].special = true;
        await all[randomNumbers[i]].save()
        i ++;
    }
}
setInterval(() => {
    switchSpecials()
},86400000);



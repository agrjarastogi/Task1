const express = require('express');
const bodyParser = require('body-parser');
const Event = require('../models/events');
const User = require('../models/user');
const authenticate = require('../authenticate');    
const router = express.Router();

router.route('/')
.get( (req,res,next)=>{
    Event.find()
    .then((event)=>{
        page= [];
        page =event;
        console.log(page);
        if(page.length > 0){
           
            res.render('event', page);
          
        }
        else{
            res.send("no data found");
        }
    })
})
.post(authenticate.verifyAdmin, (req, res, next)=>{
    Event.create(req.body)
    .then((event) => {
        console.log('Event Created', event);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish); 
    },(err)=> next(err))
    .catch((err)=> next(err));
})
.put(authenticate.verifyAdmin, (req,res,next) =>{
    res.statusCode = 403;
    res.end('Put operation is not supported');
})
.delete(authenticate.verifyAdmin, (req,res,next)=>{
    Event.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp); 
    },(err)=> next(err))
    .catch((err)=> next(err));
})


module.exports = router;
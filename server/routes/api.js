const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const mongoose = require('mongoose')
const db='mongodb://root:root123@ds111425.mlab.com:11425/peereventsdb'

mongoose.connect(db,{ useNewUrlParser: true },err =>{
    if(err)
    {
        console.error("Erro:"+err)
    }
    else
    {
        console.log('mongo db connected')
    }
})

router.get('/',(req,res)=>{
    res.send('From API Route')
})

router.post('/register',(req,res) => {
    let userData = req.body
    let user= new User(userData)
    user.save((error,registerUser)=>{
        if(error)
        {
            console.error('Error:'+error)
        }
        else
        {
            let payload = { 'subject' : registerUser._id}
            let token = jwt.sign(payload , 'secretKey')
            res.status(200).send( {token})
        }
    })
})

router.post('/login',(req,res) => {
    let userData = req.body
    User.findOne({email:userData.email},(error,user) => {
        if(error)
        {
            console.log(error)
        }
        else
        {
            if(!user)
            {
                res.status(401).send('email not found')
            }
            else
            if(user.password !== userData.password)
            {
                res.status(401).send('Invalid email or password')
            }
            else
            {
                let payload = { 'subject' : user._id}
            let token = jwt.sign(payload , 'secretKey')
                res.status(200).send( {token})
            }
        }
    })
})

router.get('/events',(req,res) => {
   
    let events=[
        {
            "_id":"4",
            "name":"Auto Expo",
            "description":"Lorem ipsum",
            "date":"2019-01-02T18:25:12.511Z"
        },
        {
            "_id":"5",
            "name":"Auto Expo",
            "description":"Lorem ipsum",
            "date":"2019-01-02T18:25:12.511Z"
        },
        {
            "_id":"6",
            "name":"Auto Expo",
            "description":"Lorem ipsum",
            "date":"2019-01-02T18:25:12.511Z"
        }
    ]

    res.json(events)
})

router.get('/special',(req,res) => {
   
    let events=[
        {
            "_id":"1",
            "name":"Auto Expo",
            "description":"Lorem ipsum",
            "date":"2019-01-02T18:25:12.511Z"
        },
        {
            "_id":"2",
            "name":"Auto Expo",
            "description":"Lorem ipsum",
            "date":"2019-01-02T18:25:12.511Z"
        },
        {
            "_id":"3",
            "name":"Auto Expo",
            "description":"Lorem ipsum",
            "date":"2019-01-02T18:25:12.511Z"
        }
    ]

    res.json(events)
})

module.exports = router
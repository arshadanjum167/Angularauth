const express = require('express')
const router = express.Router()

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
            res.status(200).send(registerUser)
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
                res.status(200).send(user)
            }
        }
    })
})

module.exports = router
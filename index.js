const express = require("express")
const {connectToRedis} = require('./helpers') 
const {rateLimiter} = require('./rateLimiter')

const app = express()
app.get("/ping",rateLimiter,async (req,res)=>{
    res.status(200).json({msg:"pong"})
})

app.listen(8000,()=>{
    console.log("App is listening at 8000")
})
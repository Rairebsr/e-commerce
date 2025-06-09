import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/mongodb.js'

//App config
const app = express()
const port = process.env.PORT || 4000
connectDb()

//middleware
app.use(express.json())
app.use(cors()) //to access backend from any id

//api endpoints
app.get('/',(req,res)=>{
    res.send("API working")
})
app.listen(port,()=> console.log('server started on port:'+ port))
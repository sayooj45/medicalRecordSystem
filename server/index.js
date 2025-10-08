
import express, { json } from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import router from './Route/loginRoutes.js'
import user from './Route/patient.js'
import hospital from "./Route/hospital.js"
import  admin  from "./Route/admin.js"
dotenv.config()

const app = express()
app.use(json())

app.use('/',router)
app.use('/',user)
app.use('/',hospital)
app.use('/',admin)
mongoose.connect('mongodb://mongodb:27017/MedicalRecordSystem').then(()=>{
    console.log('mongoDB connected ');
    
})
.catch((err)=>{
    console.log('mongoDB not connected',err);
    
})


app.listen(process.env.PORT,()=>{
    console.log('server started',process.env.PORT);
    
})
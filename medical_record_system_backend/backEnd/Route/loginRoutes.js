import { Router } from "express";
import { signup } from "../Models/model.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import authentication from "../MiddleWare/auth.js";

const router =Router()

// signup 

const generatePatientId = async () => {
    let patientId;
    let exists = true;

    while (exists) {
  
        const randomNum = Math.floor(1000 + Math.random() * 9000); 
        patientId = `PID${randomNum}`;

        const existing = await signup.findOne({ PatientId: patientId });
        if (!existing) {
            exists = false; 
        }
    }
    return patientId;
};


router.post('/patient/signup',async(req,res)=>{
    try {
        const {fullName,email,phoneNumber,age,gender,address,password,userName,role} =req.body
        console.log(fullName,email,phoneNumber,age,gender,address,password,userName,role);
        
        const userCheck = await signup.findOne({UserName:userName})
        // console.log(userCheck);
        
        if(!userCheck){
            try{
                const newPassword = await bcrypt.hash(password,10)
                console.log(newPassword);

                let patientId = null;
                if (role === 'patient') {
                    patientId = await generatePatientId();
                }

                const newData = new signup({
                    PatientId: patientId, 
                    FullName:fullName,
                    UserName:userName,
                    Email:email,
                    PhoneNumber:phoneNumber,
                    Age:age,
                    Gender:gender,
                    Password:newPassword,
                    Address:address,
                    Role:role,

                })
                await newData.save()
                res.status(200).json('signup success')
                
            }
            catch(err){
                console.log(err);
                res.status(400).json('signup fail')
                
            }
        }
        else{
            console.log('user already exist');
            res.status(400).json('user already exist')
            
        }
    } catch (error) {
        console.log(error);
        
    }
})

const generateHospitalId = async () => {
    let hospitalId;
    let exists = true;

    while (exists) {
  
        const randomNum = Math.floor(1000 + Math.random() * 9000); 
        hospitalId = `HID${randomNum}`;

        const existing = await signup.findOne({ HospitalId: hospitalId });
        if (!existing) {
            exists = false; 
        }
    }
    return hospitalId;
};

// ,authentication
router.post('/hospital/signup',async(req,res)=>{
    try {
        const {hospitalName,userName,email,phoneNumber,address,password,role,type,estYear,about} =req.body
        // console.log(fullName,email,phoneNumber,age,gender,address,password,userName,role);
        
        const userCheck = await signup.findOne({UserName:userName})
        // console.log(userCheck);
        
        if(!userCheck){
            try{
                const newPassword = await bcrypt.hash(password,10)
                console.log(newPassword);

                let hospitalId = null;
                if (role === 'hospital') {
                    hospitalId = await generateHospitalId();
                }

                const newData = new signup({
                    HospitalId:hospitalId,
                    HospitalName:hospitalName,
                    UserName:userName,
                    Email:email,
                    PhoneNumber:phoneNumber,
                    Password:newPassword,
                    Address:address,
                    Role:role,
                    Type:type,
                    EstYear:estYear,
                    About:about

                })
                await newData.save()
                res.status(200).json({msg:'signup success'})
                
            }
            catch(err){
                console.log(err);
                res.status(400).json({msg:'signup fail'})
                
            }
        }
        else{
            console.log('user already exist');
            res.status(400).json({msg:'user already exist'})
            
        }
    } catch (error) {
        console.log(error);
        
    }
})




// login 
// ,authentication
router.post('/login',async(req,res)=>{
    try {
        const {userName,password} = req.body
        console.log(userName,password);
        
        const userCheck = await signup.findOne({UserName:userName})
        console.log(userCheck);
        
        if(userCheck){
            const valid = await bcrypt.compare(password,userCheck.Password)
            console.log(valid,'valid');
            
            if(valid){
                const token = jwt.sign({userName,userRole:userCheck.Role},process.env.SECRET_KEY,{expiresIn:"1h"})
                if(token){
                    console.log(token);
                    
                    res.cookie('logToken',token,{httpOnly:true})
                    res.status(201).json({msg:'login success',userName:userName,role:userCheck.Role})
                    console.log('login success');
                    
                }
                else{
                    console.log('faild to generate token');
                    res.status(500).json('faild to generate token')
                    console.log('faild to generate token');
                    
                    
                }
            }
            else{
                console.log('incorrect password');
                res.status(400).json('incorrect password')
                
            }
        }
        else{
            console.log('user not found');
            res.status(404).json('user not found')
            
        }
    } catch (error) {
        console.log(error);
        
    }
})




router.post('/logout',(req,res) => {
    const cookieOpts = {
    httpOnly: true,
    sameSite: 'lax',                               // match your login
    secure: process.env.NODE_ENV === 'production',
    path: '/',                                     // match path
    // domain: '.yourdomain.com',                  // include if you set it at login
  };

  res.clearCookie('logToken', cookieOpts);
  res.cookie('logToken', '', { ...cookieOpts, expires: new Date(0) });
  res.set('Cache-Control', 'no-store, private');
  res.status(200).json({ msg: 'Successfully logged out' });
});



router.get('/profile',authentication,(req,res)=>{
    console.log(req.role);
    console.log(req.name);
    
    
     
    res.status(200).json({userName:req.name,role:req.role})
})
export default router
import { Router } from "express";
import { adminMessage, hospitalData, message, patientDetails, signup, statusDetails } from "../Models/model.js";
import authentication from "../MiddleWare/auth.js";
import upload from "../MiddleWare/multer.js";
import hospitalCheck from "../MiddleWare/hospitalCheck.js";


const hospital = Router()

hospital.post('/hospital/details',async(req,res)=>{
    try {
        const {UserName} = req.body
        console.log(UserName,'hi');
        
        const data = await hospitalData.findOne({UserName:UserName})
        if(data){
            console.log(data);
        return res.status(200).json(data)
        }
        else{
            return res.status(404).json({msg:'hospital not found'})
        }
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:'internel server error'})
        
    }
})



hospital.post('/hospital/profile',authentication,hospitalCheck, async(req,res)=>{
    try {
        const {about,specialties,facilities,website}=req.body
        const userName = req.name
        const data = await signup.findOne({UserName:userName})
        console.log(data);
        const hospitalDetails = await hospitalData.findOne({UserName:userName})

        if(!hospitalDetails){
            const Details = new hospitalData({
                UserName:userName,
                About:about,
                Specialties:specialties,
                Facilities:facilities,
                Website:website,
                Email:data.Email,
                PhoneNumber:data.PhoneNumber,
                Address:data.Address,
                HospitalName:data.HospitalName,
                Type:data.Type,
                EstYear:data.EstYear,
                Status:data.Status,
                HospitalId:data.HospitalId

            })
           await Details.save()
           console.log('hospital data stored');
          return res.status(201).json({msg:'hospital data stored'})
           
        }
        else{
            await hospitalData.findOneAndUpdate({UserName:userName},
                {
                   UserName:userName,
                About:about,
                Specialties:specialties,
                Facilities:facilities,
                Website:website,
                Email:hospitalDetails.Email,
                PhoneNumber:hospitalDetails.PhoneNumber,
                Address:hospitalDetails.Address,
                HospitalName:hospitalDetails.HospitalName,
                Type:hospitalDetails.Type,
                EstYear:hospitalDetails.EstYear,
                Status:hospitalDetails.Status ,
                HospitalId:hospitalDetails.HospitalId
                }
            )
            console.log('hospital data updated');
            return res.status(200).json({msg:'hospital data updated'})
            
        }
        
    } catch (error) {
        console.log(error);
        return res.status(404).json({msg:'user not found'})
        
    }
})


hospital.get('/hospital/viewStatus',authentication,hospitalCheck,async(req,res)=>{
    try {
        const userName =req.name
        const pendingStatus = await statusDetails.find({HospitalName:userName,Status:"pending"})

        if(pendingStatus){
            console.log('status',pendingStatus);
            res.status(200).json(pendingStatus)
            
        }
        else{
            console.log('no data found');
            res.status(404).json({msg:'No data found'})
            
        }
    } catch (error) {
        console.log(error);
        
    }
})



hospital.put('/hospital/status',authentication,hospitalCheck,async(req,res)=>{
    try {
        const hospitalName = req.name
        console.log(hospitalName);
        
        const {userName,status} = req.body
        console.log(status);
        
        if(hospitalName){
            await statusDetails.findOneAndUpdate({HospitalName:hospitalName,UserName:userName},
                {
                    Status:status
                }
                
            )
            console.log('status updated');
            res.status(200).json({msg:'status updated'})
            
        }
        else{
            console.log('cant update');
            
            res.status(404).json({msg:'cant update'})
        }
    } catch (error) {
        console.log(error);
        
        
    }
})

hospital.put('/hospital/reject/status',authentication,hospitalCheck,async(req,res)=>{
    try {
        const hospitalName = req.name
        console.log(hospitalName);
        
        const {userName,status} = req.body
        console.log(status);
        
        if(hospitalName){
            await statusDetails.findOneAndUpdate({HospitalName:hospitalName,UserName:userName},
                {
                    Status:status
                }
                
            )
            console.log('status updated');
            res.status(200).json({msg:'status updated'})
            
        }
        else{
            console.log('cant update');
            
            res.status(404).json({msg:'cant update'})
        }
    } catch (error) {
        console.log(error);
        
        
    }
})

hospital.get('/hospital/viewPatients',authentication,hospitalCheck,async(req,res)=>{
    
    try {
        let patients = []
        const userName = req.name
        const UserStatus = await statusDetails.find({HospitalName:userName,Status:"Approve" })
        // console.log(UserStatus);
        const patientData = await patientDetails.find()
        // console.log(patientData);
        if(!UserStatus || !patientData){
            console.log('not matching details');
            res.status(404).json({msg:'not matching details'})
        }
        else{
            UserStatus.forEach(item => {
            patientData.forEach(patient => {
                if(item.UserName === patient.UserName){
                    patients.push(patient);
                }
            });
            });

            if (patients.length === 0) {
                return res.status(404).json({ msg: 'No matching details' });
            }

        res.status(200).json(patients);
        }
    } catch (error) {
        console.log(error);
        
    }
})


hospital.post('/hospital/singleUser',authentication,hospitalCheck,async(req,res)=>{
    try {
        console.log('single');
        
            const {userName}= req.body
            const userData = await patientDetails.findOne({UserName:userName})
            // const statusData = await statusDetails.findOne({UserName:userName,Status:"Approve"})
            if(userData){
                console.log(userData);
                res.status(200).json(userData)
                
            }
            else{
                console.log('no one is approved');
                res.status(400).json({msg:'no one is approved'})
            }
    } catch (error) {
        console.log(error);
        
    }
})


const converToBase64 = (buffer)=>{
    return buffer.toString('base64')
}

hospital.post('/hospital/report',authentication,hospitalCheck,upload.single('testImage'),async(req,res)=>{
    try {
        
        const {title,date,userName} =req.body
        const checkReport = await patientDetails.findOne({UserName:userName})
        console.log(checkReport);
        let fileImage =null
        if(checkReport.TestReports){
            if(req.file){
                fileImage =converToBase64(req.file.buffer)
                await patientDetails.findOneAndUpdate(
                {UserName:userName},
                {$push:{
                    TestReports:{
                        Title:title,
                        Date:date,
                        File:fileImage
                    }
                }})
                console.log('test report updated');
                res.status(200).send('test report updated')
                
            }
            else{
                console.log('file not working');
                res.status(404).send('image problem')
            }
            
        }
    else{
        console.log('Test reports not exist');
        res.status(500).send('Test reports not exist')
        
    }
    
    } catch (error) {
        console.log(error);
        
    }
})

//prescription

hospital.post('/hospital/prescription',authentication,hospitalCheck,upload.single('testImage'),async(req,res)=>{
    try {
        
        const {duration,date,userName,title} =req.body
        const checkprescription = await patientDetails.findOne({UserName:userName})
        console.log(checkprescription);
        let fileImage =null
        
            if(req.file){
                fileImage =converToBase64(req.file.buffer)
                await patientDetails.findOneAndUpdate(
                {UserName:userName},
                {$push:{
                    Prescription:{
                        Duration:duration,
                        Title:title,
                        Date:date,
                        File:fileImage
                    }
                }})
                console.log(' prescription updated');
                res.status(200).json({msg:' prescription updated'})
                
            }
            else{
                console.log('file not working');
                res.status(404).json({msg:'image problem'})
            }
            

   
    
    } catch (error) {
        console.log(error);
        
    }
})

hospital.get('/hospital/message',authentication,hospitalCheck,async(req,res)=>{
    try {
        const userName = req.name
        const message = await adminMessage.find({UserName:userName})
        if(message){
            
            console.log(message);
            res.status(200).json(message)
            
        }
        else{
            console.log('no message found');
            res.status(404).json({msg:'no message found'})
            
        }
        
    } catch (error) {
        console.log(error);
        
    }
})




hospital.post('/hospital/message',authentication,hospitalCheck,upload.single('file'),async(req,res)=>{
    try {
        const {comment}=req.body
        const userName = req.name
        let image = null
        if(req.file){
            image = converToBase64(req.file.buffer)
            const messageData = new message({
                UserName:userName,
                Comment:comment,
                File:image
            })
            await messageData.save()
            console.log('message saved');
            res.status(200).json({msg:'message saved'})
            
        }
        else{
            console.log('message file not found');
            res.status(404).json({msg:'message file not found'})
        }
    } catch (error) {
        console.log(error);
        
    }

})


export default hospital
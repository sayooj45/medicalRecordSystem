import {Router} from 'express'
import { adminMessage, hospitalData, message, patientDetails, signup, statusDetails } from '../Models/model.js'
import authentication from '../MiddleWare/auth.js'
import upload from '../MiddleWare/multer.js'
import patientCheck from '../MiddleWare/patientCheck.js'
const  user = Router()

const converToBase64 = (buffer)=>{
    return buffer.toString('base64')
}

user.post('/user/profile',authentication,patientCheck, async(req,res)=>{
    try {
        
        
        const {bloodGroup,allergies,dieseases,height,weight,hartRate,temperature,glucose} = req.body
        const userName = req.name
        const result = await signup.findOne({UserName:userName})

        const checkUser = await patientDetails.findOne({UserName:userName})
        if(checkUser){
            await patientDetails.findOneAndUpdate({UserName:userName},{
                UserName:userName,
                BloodGroup:bloodGroup,
                Allergies:allergies,
                Dieseases:dieseases,
                Height:height,
                Weight:weight,
                HartRate:hartRate,
                Temperature:temperature,
                Glucose:glucose,
                
                
            })
            console.log('data updated');
            res.status(200).json({msg:'data updated'})
            
        }
        else{
            const newData = new patientDetails({
                UserName:userName,
                BloodGroup:bloodGroup,
                Allergies:allergies,
                Dieseases:dieseases,
                Height:height,
                Weight:weight,
                HartRate:hartRate,
                Temperature:temperature,
                Glucose:glucose,
                FullName:result.FullName,
                Email:result.Email,
                PhoneNumber:result.PhoneNumber,
                Age:result.Age,
                Gender:result.Gender,
                Address:result.Address,
                PatientID:result.PatientID
                
            })
            await newData.save()
            console.log('data created');
           res.status(201).json({msg:'data created'})
            

        }
            
        
    }
     catch (error) {
        console.log(error);

        
    }
    
    
})




user.get('/user/singlePatient',authentication,patientCheck,async(req,res)=>{
    try {
        console.log('profile fetching');
        const userName = req.name
        const details = await patientDetails.findOne({UserName:userName})
        
        console.log(details);
        
        if(details){
            console.log(details);
            
           return res.status(200).json(details)
        }
        return res.status(404).json({msg:"user not found"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Server error", error: error.message });
        
    }
})


user.post('/user/profile/report',authentication,patientCheck,upload.single('testImage'),async(req,res)=>{
    try {
        
        const userName = req.name
        const {title,date} =req.body
        console.log(title,date,userName);
        console.log(req.file);
        
        
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
               return res.status(200).json({msg:'test report updated'})
                
            }
            else{
                console.log('file not working');
              return  res.status(404).json({msg:'image problem'})
            }
            
        }
    else{
        console.log('Test reports not exist');
        res.status(500).json({msg:'Test reports not exist'})
        
    }
    
    } catch (error) {
        console.log(error);
        
    }
})


user.post('/user/profile/dp',authentication,patientCheck,upload.single('profileDp'),async(req,res)=>{
    try {
        const userName = req.name
        let dp = null
        if(req.file){
            dp = converToBase64(req.file.buffer)
            await patientDetails.findOneAndUpdate({UserName:userName},
                {Image:dp}
            )
            console.log('image updated');
            res.status(200).send('image updated')
            
        }
        else{
            console.log('cant get dp file');
            res.status(400).send('cant get dp file')
            
        }
    } catch (error) {
        console.log(error);
        
    }
})


user.get('/user/profile/HospitalList',authentication,patientCheck,async(req,res)=>{
    try {
        
        const HospitalList = await hospitalData.find()
        if(HospitalList){
            HospitalList.map(item=>{
                console.log(item.HospitalName,item.Type,item.EstYear);
            })
            
            res.status(200).json(HospitalList)
            
        }
        else{
            console.log('No hospital details exist');
            res.status(400).json({msg:'No hospital details exist'})
            
        }
    } catch (error) {
        console.log(error);
        
    }
})


user.post('/user/message',authentication,patientCheck,upload.single('file'),async(req,res)=>{
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




user.post('/user/hospital',authentication,patientCheck,async(req,res)=>{
    try {
        const {userName} = req.body
        console.log(userName);
        
        const hospitalDetails = await hospitalData.findOne({UserName:userName})
        if(hospitalDetails){
            console.log(hospitalDetails.HospitalName,hospitalDetails.Type,hospitalDetails.EstYear,hospitalDetails.Address,hospitalDetails.About,hospitalDetails.Specialties,hospitalDetails.Facilities,hospitalDetails.Website);
            res.status(200).json(hospitalDetails)
        }
        else{
            console.log('hospital doesnt exist');
            res.status(404).json({msg:'hospital doesnt exist'})
            
        }
    } catch (error) {
        console.log(error);
        
    }
})


user.delete('/user/delete',authentication,patientCheck,async(req,res)=>{
    try {
        const {title} =req.body
        const userName = req.name
        const result =await patientDetails.findOne({UserName:userName})
        
        const data = result.TestReports.some(item=>
            item.Title === title  )
        console.log(data);
        
        if(data){
            await patientDetails.findOneAndUpdate({UserName:userName},
            {$pull:{TestReports:{Title:title}}},
            {new:true})
            console.log('data deleted');
            res.status(200).send('data deleted')
            
        }
        else{
            console.log('wrong title');
            res.status(400).send('wrong title')
            
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('server error');
        
    }
})

user.post('/user/status',authentication,patientCheck,async(req,res)=>{
    try {
        
        
        console.log('status');
        
        const {hospitalName,status}=req.body
        console.log(hospitalName,status);
        const userName = req.name
        const statusData = await statusDetails.findOne({UserName:userName,HospitalName:hospitalName})
        if(!statusData){
            
            const newStatus = new statusDetails({
                UserName:userName,
                HospitalName:hospitalName,
                Status:status

            })
            await newStatus.save()
            console.log('status updated');
            res.status(200).json({msg:'status updated'})
            
        }
        else{
            console.log('already exist');
            res.status(400).json({msg:'already exist'})
            
        }
    } catch (error) {
        console.log(error);
        
    }

})




user.post('/user/prescription',authentication,patientCheck,upload.single('testImage'),async(req,res)=>{
    try {
        
        const {duration,date,title} =req.body
        const userName = req.name
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


user.get('/user/message',authentication,patientCheck,async(req,res)=>{
    try {
        const userName = req.name
        const message = await adminMessage.find({UserName:userName})
        if(message){
            
            console.log(message);
            res.status(200).send(message)
            
        }
        else{
            console.log('no message found');
            res.status(400).send('no message found')
            
        }
        
    } catch (error) {
        console.log(error);
        
    }
})


export default user
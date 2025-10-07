import { Router } from "express";
import authentication from "../MiddleWare/auth.js";
import { adminMessage, hospitalData,  message,  patientDetails,  signup } from "../Models/model.js";
import upload from "../MiddleWare/multer.js";
import adminCheck from "../MiddleWare/adminCheck.js";

const admin = Router()
// ,
admin.get('/admin/hospital',authentication,adminCheck, async(req,res)=>{
    try {
        const hospitalData = await signup.find({Role:"hospital"})
        if(hospitalData){
            console.log(hospitalData);
            res.status(200).json(hospitalData)
        }
        else{
            console.log('no hospital details');
            res.status(404).json('no hospital details')
        }
    } catch (error) {
        console.log(error);
        
    }
})

// 
admin.get('/admin/patient',authentication,adminCheck,async(req,res)=>{
    try {
        const patientData = await signup.find({Role:"patient"})
        if(patientData){
            console.log(patientData);
            res.status(200).send(patientData)
        }
        else{
            console.log('no hospital details');
            res.status(404).send('no hospital details')
        }
    } catch (error) {
        console.log(error);
        
    }
})

admin.post('/admin/singleHospital',authentication,adminCheck,async(req,res)=>{
    try {
        const {userName} = req.body
        console.log(userName);
        
        const hospialDetails = await hospitalData.findOne({UserName:userName})
        console.log(hospialDetails);
        
        if(hospialDetails){
            console.log(hospialDetails);
            res.status(200).json(hospialDetails)
            
        }
        else{
            console.log('hospital not found');
            res.status(404).json({msg:'hospital not found'})
            
        }
    } catch (error) {
        console.log(error);
        
    }
})

// 
admin.post('/admin/singlePatient',authentication,adminCheck,async(req,res)=>{
    try {
        const {userName}= req.body
        console.log(userName,'patient name');
        
        const patientData = await patientDetails.findOne({UserName:userName})
        if(patientData){
            console.log(patientData);
            res.status(200).json(patientData)
            
        }
        else{
            console.log('patient not found');
            res.status(404).json({msg:'patient not found'})
            
        }
    } catch (error) {
        console.log(error);
        
    }
})

// 
admin.delete('/admin/patient',authentication,adminCheck, async (req, res) => {
  try {
    console.log(req.body);

    const { PatientId } = req.body;

    const patient = await patientDetails.findOne({ PatientId });
    const signupUser = await signup.findOne({ PatientId });

    if (patient || signupUser) {
      if (patient) {
        await patientDetails.findOneAndDelete({ PatientId });
      }
      if (signupUser) {
        await signup.findOneAndDelete({ PatientId });
      }

      console.log('successfully deleted');
      return res.status(200).json({ msg: 'successfully deleted' });
    }

    console.log('No data found');
    return res.status(404).json({ msg: 'No data found' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});


// 
admin.delete('/admin/hospital',authentication,adminCheck,async(req,res)=>{
    try {
        const {HospitalId} = req.body
        console.log(HospitalId);
        
        const hospital = await hospitalData.findOne({HospitalId:HospitalId})
        const signupHospital = await signup.findOne({ HospitalId:HospitalId });
        if(hospital || signupHospital){
            if(hospital){
                await hospitalData.findOneAndDelete({HospitalId:HospitalId })
            }
            if(signupHospital){
                await signup.findOneAndDelete({HospitalId:HospitalId});
            
            
        }
         console.log('successfully deleted');
      return res.status(200).json({ msg: 'successfully deleted' });
      
    }
          console.log('No data found');
        return res.status(404).json({ msg: 'No data found' });
    }
     catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
})

// 

admin.get('/admin/messages',authentication,adminCheck,async(req,res)=>{
    try {
        const messages= await message.find()
        
        if(messages){
            console.log(messages);
            res.status(200).send(messages)
            
        }
        else{
            console.log('no messages found');
            res.status(404).send('No messages found')
            
        }
    } catch (error) {
        console.log(error);
        
    }
})


const covertToBase64 = (buffer)=>{
    return buffer.toString('base64')
}

// 
admin.post('/admin/message',authentication,adminCheck,upload.single('messageImage'),async(req,res)=>{
    
    try {
        let image = null
        const {userName,comment} = req.body
        console.log(userName,comment);
        
        if(req.file){
            image=covertToBase64(req.file.buffer)
            // console.log(image);
            
            const newData = new adminMessage({
                UserName:userName,
                Comment:comment,
                File:image,
                // Role:role
            })
            await newData.save()
            console.log('message saved');
           return res.status(201).json({msg:'message saved'})
            
        }
        else{
            console.log('no file');
         return   res.status(400).json({msg:'file not found'})
            
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'server error' });
        
    }
})

export default admin
import { Schema,model } from "mongoose";

const signupSchema = new Schema({
    PatientId: String,
    HospitalId: String,
    FullName:String,
    UserName:{type:String,unique:true},
    Email:{type:String,required:true},
    PhoneNumber:{type:Number,required:true},
    Age:Number,
    Gender:String,
    Address:{type:String,required:true},
    Password:{type:String,required:true},
    HospitalName:String,
    Type:String,
    About:String,
    EstYear:{ type: String, match: /^\d{4}-\d{2}-\d{2}$/ },
    Role:{type:String,enum:['hospital','patient','admin'],required:true}

})

const signup = model('signup',signupSchema)

export{signup}

// patient

const TestReportSchema = new Schema({
    Title:String,
    Date:Date,
    File:String
})

const PrescriptionSchema = new Schema({
    Title:String,
    File:String,
    Date:Date,
    Duration:String

})

const patientSchema = new Schema({
    UserName:String,
    PatientID:String,
    BloodGroup:String,
    Allergies:String,
    Dieseases:String,
    Height:String,
    Weight:String,
    HartRate:String,
    Temperature:String,
    Glucose:String,
    FullName:String,
    Email:String,
    PhoneNumber:Number,
    Age:Number,
    Gender:String,
    Address:String,
    Image:String,
    TestReports:[TestReportSchema],
    Status:String,
    Prescription:[PrescriptionSchema]
})

const patientDetails = model('patientData',patientSchema)

export {patientDetails}


const contactSchema = new Schema({
    UserName:String,
    Comment:String,
    File:String
})

const message = model('message',contactSchema)

export {message}


// hospital 

const hospitalSchema = new Schema({
    UserName:{type:String,unique:true},
    About:String,
    Specialties:String,
    Facilities:String,
    Website:String,
    Email:String,
    PhoneNumber:Number,
    Address:String,
    HospitalName:String,
    Type:String,
    HospitalId:String,
    EstYear:{ type: String, match: /^\d{4}-\d{2}-\d{2}$/ },
    

})

const hospitalData = model('hospitalDetails',hospitalSchema)

export {hospitalData}

const statusSchema = new Schema({
    UserName:{type:String,required:true},
    HospitalName:{type:String,required:true},
    Status:String
})
const statusDetails = model('status',statusSchema)
export {statusDetails}


const adminMessageSchema = new Schema({
    UserName:String,
    Comment:String,
    File:String,
    // Role:String
})
const adminMessage = model('adminMessage',adminMessageSchema)
export {adminMessage}
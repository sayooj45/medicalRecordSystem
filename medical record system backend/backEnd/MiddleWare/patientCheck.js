function patientCheck(req,res,next){
    if(req.role === 'patient'){
        next()
    }
    else{
        res.status(401).json({
            msg:"unauthorized access"
            
        })
    }
}

export default patientCheck
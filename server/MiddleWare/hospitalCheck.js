function hospitalCheck(req,res,next){
    if(req.role === 'hospital'){
        next()
    }
    else{
        res.status(401).json({
            msg:"unauthorized access"
            
        })
    }
}

export default hospitalCheck
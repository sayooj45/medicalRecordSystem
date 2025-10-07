function adminCheck(req,res,next){
    if(req.role === 'admin'){
        next()
    }
    else{
        res.status(401).json({
            msg:"unauthorized access"
            
        })
    }
}

export default adminCheck
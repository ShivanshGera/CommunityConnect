exports.isCitizen = (req,res,next) =>{
    try{
        if(req.user.role !== "citizen"){
            return res.status(403).json({
                success:false,
                message:"This route is only for Citizens",
            });
        }

        next()

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Citizen role check failed",
        });

    }

};

exports.isAdmin = (req,res,next) =>{
    try{
        if(req.user.role !== "admin"){
            return res.status(403).json({
                success:false,
                message:"This route is only for Admins"
            });
        }

        next()

    }catch(error){

        return res.status(500).json({
            success:false,
            message:"Admin role check failed",
        });

    }
};


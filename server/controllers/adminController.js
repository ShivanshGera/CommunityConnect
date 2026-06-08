const Issue = require("../models/Issue");

exports.getAllIssues = async (req,res) => {
    try{

        const issues = await Issue.find()
           .populate("reportedBy", "name email")
           .sort({createdAt: -1});

        res.status(200).json({
            success:true,
            count:issues.length,
            issues,
        });

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });

    }
};


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

exports.updateIssueStatus = async (req,res) => {
    try{
        const {status} = req.body;

        //validate status
        const allowedStatus = [
            "Pending",
            "In Progress",
            "Resolved",
        ];

        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                success:false,
                message:"Invalid status",
            });
        }

        const issue = await Issue.findById(req.params.id);

        if(!issue){
            return res.status(404).json({
                success:false,
                message:"Issue not found",
            });
        }

        issue.status = status;

        await issue.save();

        res.status(200).json({
            success:true,
            message:"Issue status updated succesfully",
            issue,

        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
        
    }
};

exports.getDashboardStats = async (req,res) => {
    try{
        const totalIssues = await Issue.countDocuments();

        const pendingIssues = await Issue.countDocuments({

         status:"Pending",
        
        });

        const inProgressIssues = await Issue.countDocuments({
            status:"In Progress",
        });

        const resolvedIssues = await Issue.countDocuments({
            status:"Resolved",
        });

        res.status(200).json({
            success:true,
            stats:{
                totalIssues,
                pendingIssues,
                inProgressIssues,
                resolvedIssues,
            },
        });

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });

    }
};




const Issue = require("../models/Issue");

exports.createIssue = async (req,res) => {
    try{
        const{
            title,
            description,
            category,
            location,
        } = req.body

        if(!title || !description || !category || !location){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }

        const issue = await Issue.create({
            title,
            description,
            category,
            location,
            reportedBy: req.user._id,
        });

        res.status(201).json({
            success:true,
            message:"Issue reported successfully",
            issue,
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }
};

exports.getMyIssues = async (req,res) => {
    try{
        const issues = await Issue.find({
            reportedBy: req.user._id,
        }).sort({ createdAt: -1});

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

exports.getIssueById = async (req,res) =>{
    try{
        const issue = await Issue.findById(req.params.id);

        if(!issue){
            return res.status(404).json({
                success:false,
                message:"Issue not found"

            });
        }

        res.status(200).json({
            success:true,
            issue,
        });

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });

    }
};
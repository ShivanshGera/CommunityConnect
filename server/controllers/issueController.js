const Issue = require("../models/Issue");
const cloudinary = require("../utils/cloudinary");

exports.createIssue = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
    } = req.body;

    if (
      !title ||
      !description ||
      !category ||
      !location
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "community-connect",
        }
      );

      imageUrl = result.secure_url;
    }

    const issue = await Issue.create({
      title,
      description,
      category,
      location,
      image: imageUrl,
      reportedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Issue reported successfully",
      issue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
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

exports.updateIssue = async (req,res) => {
    try{
        const issue = await Issue.findById(req.params.id);

        if(!issue){
            return res.status(404).json({
                succcess:false,
                message:"Issue not found",
            });
        }

        //check ownership
        if(issue.reportedBy.toString() !== req.user._id.toString()){
            return res.status(403).json({
                success:false,
                message:"You can only update your own issues",
            });
        }

        //check status
        if(issue.status !== "Pending"){
            return res.status(400).json({
                success:false,
                message:"Only pending issues can be updated",
            });
        }

        const updatedIssue = await Issue.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true,
                runValidators:true,
            }
        );

        res.status(200).json({
            success:true,
            message:"Issue updated successfully",
            issue:updatedIssue,
        });

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });

    }
};

exports.deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    // Check ownership
    if (issue.reportedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own issues",
      });
    }

    // Check status
    if (issue.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending issues can be deleted",
      });
    }

    await Issue.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Issue deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





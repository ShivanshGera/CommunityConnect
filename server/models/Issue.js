const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:[true,"Title is required"],
            trim:true
        },
        description:{
            type:String,
            required:[true,"Description is required"],
        },
        category:{
            type:String,
            enum:[
                "Road Damage",
                "Garbage",
                "Street Light",
                "Water Leakage",
                "Traffic Issue",
                "Other",
            ],
            required:true,
        },
        image:{
            type:String,
            default:"",
        },
        location:{
            type:String,
            required:[true,"Location is required"],
        },
        status:{
            type:String,
            enum:["Pending", "In Progress", "Resolved"],
            default:"Pending",

        },
        reportedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:"true",
        },
    },
    {
        timestamps:true,
    }
);

module.exports = mongoose.model("Issue",issueSchema);


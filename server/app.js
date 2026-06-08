const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const issueRoutes = require("./routes/issueRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req,res) => {
    res.send("CommunityConnect API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/issues",issueRoutes);
app.use("/api/admin", adminRoutes);


module.exports = app;
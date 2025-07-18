const express = require("express");

const app = express();

app.use(express.json());

const notes = [];
app.post("/notes",(req,res)=>{
    console.log(req.body)
    notes.push(req.body)
    res.status(201).json({
        message:"notes created successfully"
    })
})

app.get("/notes",(req,res)=>{
    res.status(200).json({
        message:"notes fetch successfully",
        notes
    })
   
})

module.exports = app
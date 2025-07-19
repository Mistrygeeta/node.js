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

/*DELETE method*/

app.delete("/notes/:index", (req, res)=>{
    const index = req.params.index

    delete notes[index];

    res.status(200).json({
        message: "notes deleted successfully"
    })
})

app.patch("/notes/:index", (req,res)=>{
    const index = req.params.index
    const {title} = req.body;
    notes[index].title = title

    res.status(200).json({
        message : "notes updated successfully"
    })
})

module.exports = app
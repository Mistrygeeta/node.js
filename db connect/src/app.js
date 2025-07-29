const express = require("express");
const notesModel = require("./models/notes.model")
const app = express();

app.use(express.json())
app.post("/notes",async (req, res)=>{
    const {title, content} = req.body

    await notesModel.create({
        title , content
    })

    res.status(201).json({
        message: "note created successfully"
    })
})

// app.get("/notes", async(req, res)=>{
//     const notes = await notesModel.find()
//     res.status(200).json({
//         message: "notes fetched successfully",
//         notes
//     })
// })

app.get("/notes", async(req, res)=>{
    const notes = await notesModel.find({});
        res.status(200).json({
            message : "notes fetched successfully",
            notes   
        })
    
})

app.delete("/notes/:id", async(req, res)=>{
    const id  = req.params.id
  const notes=  await notesModel.findOneAndDelete({
        _id : id
    })

    res.status(200).json({
        message:' note deleted successfully',
        notes
    })
})

app.patch("/notes/:id", async(req, res)=>{
    const id = req.params.id
    const {title} = req.body
    await notesModel.findOneAndUpdate({_id: id},{title})
    res.status(200).json({
    message : "notes updated successfully"
})
})



module.exports = app;
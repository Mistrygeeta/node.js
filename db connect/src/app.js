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


module.exports = app;
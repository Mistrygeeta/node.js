const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    title : String,
    content : String
})

const notesModel = mongoose.model("notes", notesSchema)

module.exports = notesModel;
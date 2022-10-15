const mongoose = require('mongoose');
const NoteSchema = new mongoose.Schema({
    title : {
        type: String,
        required: [true,'Please add a title'],
        unique: true,
        trim: true,
        maxlength: [40, 'Title cannot be more than 40 characters']
    },
    description: {
        type: String,
        required: true,
        maxlength: [200, 'Description cannot be more than 200 characters']
    },
    parentId:{
        type: Number,
    },
    label:{
        type: String,
    },
    id:{
        type: Number,
    }
})

module.exports = mongoose.models.Cat || mongoose.model('Cat', NoteSchema);
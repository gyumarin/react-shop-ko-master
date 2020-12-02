const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const taskSchema = mongoose.Schema({

    writer:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title:{
        type: String,
        maxlength: 50
    },
    description: {
        type: String,
    },
    productId: {
        type: String,
    },
    githubURI: {
        type: String
    }
}, {timestamps: true})


const Task = mongoose.model('Task', taskSchema);

module.exports = { Task }
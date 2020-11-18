const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = mongoose.Schema({

    writer:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    ceoName:{
        type: String,
        maxlength: 50
    },
    coName:{
        type: String,
        maxlength: 50
    },
    coAddress:{
        type: String,
        maxlength: 50
    },
    coDescription : {
        type: String,
    },
    coRegistrationNumber:{
        type: String,
        maxlength: 50
    },
    coImage: {
        type: Array,
        default: []
    },
    keywords: {
        type: Array,
        default: []
    },
    sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    
}, {timestamps: true})


const Company = mongoose.model('Company', companySchema);

module.exports = { Company }
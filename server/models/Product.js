const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = mongoose.Schema({

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
    price: {
        type: Number,
        default: 0
    },
    images: {
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
    positions: {
        type: Number,
        default: 1
    },
    keywords: {
        type: Array,
        default: []
    },
    deadline: {
        type: Date,
        maxlength: 10
    },
}, {timestamps: true})
//검색 기능에서 검색 우선순위 설정
productSchema.index({
    title: 'text',
    description: 'text',
    writer: 'text'
},{
    weights:{
        title:5,
        description: 3,
        writer: 5
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }
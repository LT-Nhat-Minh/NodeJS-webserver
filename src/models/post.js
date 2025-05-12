const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    time: Number,
    thumbnail: String,
    title: String,
    blocks: {
        type: Array,
        default: [],
    },
    authorID: String,
    lastModifiedBy: String,
    version: String,
},
    {
        timestamps: true,
    }
);


const Post = mongoose.model('Posts', postSchema);

module.exports = Post;


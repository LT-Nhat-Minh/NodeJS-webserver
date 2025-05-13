const { stringify } = require("uuid");
const Post = require("../models/post");

const getAllPosts = async (start, end) => {
    if(start && end) {
        try {
            const result = await Post.find({}).skip(start).limit(end-start);
            const length = await Post.countDocuments({});
            return {
                data: result,
                total: length,
                start: start,
                end: end,
            };
        } catch (error) {
            throw {
                EC: 1,
                data: null,
                message: 'Error fetching posts with pagination',
                statusCode: 500,
            };
        }
    }
    else {
        try {
            const result = await Post.find({});
            return {
                EC: 0,
                data: result,
                message: 'Get all posts successfully',
                statusCode: 200,
            };
        } catch (error) {
            console.error('Error fetching all posts:', error);
            throw error;
        }
    }
    
}

const getPostByID = async (id) => {
    try {
        console.log('Fetching post with ID:', id);
        const result = await Post.findOne({ _id: id });
        if (!result) {
            throw {
                EC: 1,
                data: null,
                message: 'Post not found',
                statusCode: 404,
            };
        }
        return {
            EC: 0,
            data: result,
            message: 'Get post successfully',
            statusCode: 200,
        };
    } catch (error) {
        console.error('Error fetching post:', error);
        throw {
            EC: 1,
            data: null,
            message: error.message,
            statusCode: 500,
        };
    }
}

const createPost = async (data) => {
    const {time, thumbnail, title, blocks, authorID, lastModifiedBy, version} = data;
    try {
        const newPost = new Post({
            time,
            thumbnail,
            title,
            blocks,
            authorID,
            lastModifiedBy,
            version,
        });
        const result = await newPost.save();
        if (!result) {
            throw {
                EC: 1,
                data: null,
                message: 'Error creating post',
                statusCode: 500,
            };
        }
        return {
            EC: 0,
            data: result,
            message: "Create post successfully",
            statusCode: 200,
        }
        
    } catch (err) {
        throw {
            EC: 1,
            data: null,
            message: err.message,
            statusCode: 500,
        };
    }

    
}

const updatePostByID = async (data) => {
    const { id, thumbnail, title, time, blocks,  authorID, lastModifiedBy, version } = data;
    try {
        const result = await Post.findByIdAndUpdate({_id: id}, {
            time,
            thumbnail,
            title,
            blocks,
            authorID,
            lastModifiedBy,
            version,
        }, { new: true });
        if (!result) {
            throw {
                EC: 1,
                data: null,
                message: 'Post not found',
                statusCode: 404,
            };
        }
        return {
            EC: 0,
            data: result,
            message: 'Post updated successfully',
            statusCode: 200,
        };
    } catch (error) {
        console.error('Error updating post:', error);
        throw {
            EC: 1,
            data: null,
            message: error.message,
            statusCode: 500,
        };
    }
}

const deletePostByID = async (id) => {
    try {
        const result = await Post.findByIdAndDelete(id);
        if (!result) {
            throw {
                EC: 1,
                data: null,
                message: 'Post not found',
                statusCode: 404,
            };
        }
        return {
            EC: 0,
            data: result,
            message: 'Post deleted successfully',
            statusCode: 200,
        };
    } catch (error) {
        console.error('Error deleting post:', error);
        throw {
            EC: 1,
            data: null,
            message: error.message,
            statusCode: 500,
        };
    }
}

module.exports = {
    getAllPosts, getPostByID, createPost, updatePostByID, deletePostByID
}
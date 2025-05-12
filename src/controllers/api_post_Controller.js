const { getAllPosts, createPost, deletePostByID, getPostByID, updatePost, updatePostByID } = require("../services/post.service");

const getPostAPI = async (req, res) => {
    const { id, start, limit } = req.query;
    if(!id){
        try {
            const results = await getAllPosts(start, limit);
            return res.status(200).json({
                EC: 0,
                data: results.data,
                total: results.total,
                message: "Get all posts successfully",
            });
        } catch (err) {
            return res.status(500).json({
                EC: 1,
                data: null,
                message: "Get all posts failed",
                statusCode: 500,
            });
        }
    }
    else {
        try {
            const result = await getPostByID(id);
            if (!result) {
                return res.status(404).json({
                    EC: 1,
                    data: null,
                    message: "Post not found",
                    statusCode: 404,
                });
            }
            return res.status(200).json({
                EC: 0,
                data: result.data,
                message: "Get post successfully",
                statusCode: 200,
            });
        } catch (err) {
            return res.status(err.statusCode || 500).json({
                EC: 1,
                data: null,
                message: err.message,
                statusCode: err.statusCode || 500,
            });
        }
    }
}

const postPostAPI = async (req, res) => {
    const {time, thumbnail, title, blocks, version, authorID, lastModifiedBy} = req.body;
    try {
        const result = await createPost({
            time,
            thumbnail,
            title,
            blocks,
            version,
            authorID,
            lastModifiedBy
        });
        
        return res.status(200).json({
            EC: 0,
            data: result.data,
            message: "Create post successfully",
            statusCode: 200,
        });
    } catch (err) {
            console.error('Error creating post:', err);
            return res.status(err.statusCode || 500).json({
            EC: 1,
            data: null,
            message: err.message,
            statusCode: err.statusCode || 500,
        });
    }
}

const updatePostAPI = async (req, res) => {
    const { id, thumbnail, title, time, blocks,  authorID, lastModifiedBy, version } = req.body;
    try {
        const result = await updatePostByID(id, {
            time,
            thumbnail,
            title,
            blocks,
            authorID,
            lastModifiedBy,
            version,
        });
        
        return res.status(200).json({
            EC: 0,
            data: result.data,
            message: "Update post successfully",
            statusCode: 200,
        });
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            EC: 1,
            data: null,
            message: err.message,
            statusCode: err.statusCode || 500,
        });
    }
}

const deletePostAPI = async (req, res) => {
    const { id } = req.query
    if (!id) {
        return res.status(400).json({
            EC: 1,
            data: null,
            message: "Missing id",
            statusCode: 400,
        });
    }
    try {
        const result = await deletePostByID(id);
        if (!result) {
            return res.status(404).json({
                EC: 1,
                data: null,
                message: "Post not found",
                statusCode: 404,
            });
        }
        return res.status(200).json({
            EC: 0,
            data: result.data,
            message: "Delete post successfully",
            statusCode: 200,
        });
    } catch (err) {
        return res.status(500).json({
            EC: 1,
            data: null,
            error: err.message,
            message: "Delete post failed",
            statusCode: 500,
        });
    }
}

module.exports = {
    getPostAPI,
    postPostAPI,
    updatePostAPI,
    deletePostAPI
}
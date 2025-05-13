export const uploadFileAPI = async (req, res) => {

    console.log("Upload file API called, >>>req.file", req.file);
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                EC: 1,
                data: null,
                message: "File not found",
                statusCode: 400,
            });
        }
        return res.status(200).json({
            EC: 0,
            data: file,
            message: "Upload file successfully",
            statusCode: 200,
        });
        
    }
    catch (err) {
        return res.status(500).json({
            EC: 1,
            data: null,
            message: "Upload file failed",
            statusCode: 500,
        });
    }
}
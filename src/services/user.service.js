const User = require('../models/user');


const getAllUser = async () => {
    try {
        const result = await User.find({});
        return {
            EC: 0,
            data: result,
            message: 'Get all users successfully',
            statusCode: 200,
        };
    }
    catch (error) {
        console.error('Error fetching users:', error);
        throw {
            EC: 1,
            data: null,
            message: error.message,
            statusCode: 500,
        };
    }
}

const getUserById = async (id) => {
    try {
        const result = await User.findById({ _id: id });
        if (!result) {
            throw {
                EC: 1,
                data: null,
                message: 'User not found',
                statusCode: 404,
            };
        }
        return {
            EC: 0,
            data: result,
            message: 'Get user successfully',
            statusCode: 200,
        };
    } catch (error) {
        console.error('Error fetching user:', error);
        throw {
            EC: 1,
            data: null,
            message: 'Error fetching user',
            statusCode: 500,
        };
    }
}

const getUserByEmail = async (email) => {
    try {
        const result = await User.find({ email: email });
        if (!result) {
            throw{
                EC: 1,
                data: null,
                message: 'User not found',
                statusCode: 404,
            }
        }
        return {
            EC: 0,
            data: result,
            message: 'Get user successfully',
            statusCode: 200,
        };
    } catch (error) {
        throw {
            EC: 1,
            data: null,
            message: error.message,
            statusCode: 500,
        };
    }
}

const createUser = async (data) => {
    const { name, email, password, phoneNumber, role } = data;
    try{
        // Check if user already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            throw {
                EC: 1,
                data: null,
                message: 'Email already exists',
                statusCode: 400,
            };
        }
        // Create new user
        const newUser = new User({
            name,
            email,
            password,
            phoneNumber,
            role
        });
        await newUser.save();
        return {
            EC: 0,
            data: newUser,
            message: 'User created successfully',
            statusCode: 200,
        };  
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw {
            EC: 1,
            data: null,
            message: error.message,
            statusCode: 500,
        };
    }
}

const updateUserByID = async (data) => {
    const { id, name, email, phoneNumber, role } = data;
    console.log(">>>data", data);
    try{
        const result = await User.findByIdAndUpdate(
            { _id: id },
            {
                name,
                email,
                phoneNumber,
                role
            },
            { new: true }
        );
        if (!result) {
            throw {
                EC: 1,
                data: null,
                message: 'User not found',
                statusCode: 404,
            };
        }
        return {
            EC: 0,
            data: result,
            message: 'User updated successfully',
            statusCode: 200,
        };
    }
    catch (error) {
        console.error('Error updating user:', error);
        throw {
            EC: 1,
            data: null,
            message: error.message,
            statusCode: 500,
        };
    }
}

const deleteUserByID = async (id) => {
    try {
        const user = await getUserById(id);
        console.log(">>>user", user);

        // // delete image file logic
        // const imagePath = path.join(__dirname, '../../public/images', user.image);
        // fs.unlink(imagePath, (err) => {
        //     if (err) {
        //         console.error('Error deleting image file:', err.message);
        //     } else {
        //         console.log('Image file deleted successfully:', imagePath);
        //     }
        // });

        const result = await User.deleteOne({ _id: id });
        return {
            EC: 0,
            data: result,
            message: 'User deleted successfully',
            statusCode: 200,
        };
    } catch (error) {
        console.error('Error deleting user:', error);
        throw {
            EC: 1,
            data: null,
            message: error.message,
            statusCode: 500,
        };
    }
}

const handleUserLogin = async (data) => {
    const { email, password } = data;
    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
        throw ({
            EC: 1,
            data: null,
            message: 'Invalid email or password',
            statusCode: 401,
        });
    }

    const result = await user.comparePassword(password);
    if (!user || !result) {
        throw ({
            EC: 1,
            data: null,
            message: 'Invalid email or password',
            statusCode: 401,
        });
    }

    // Generate JWT token
    const token = await user.generateAuthToken();

    console.log('User logged in:', user);
    console.log('Generated token:', token);

    return {
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
        },
        access_token: token,
    }
};

const handleUserRegister = async (data) => {
    const { name, email, password, phoneNumber } = data;

    // Check if user already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        throw {
            EC: 1,
            message: 'Email already exists',
            data: null,
            statusCode: 400,
        };
    }

    // Create new user
    const newUser = new User({
        name,
        email,
        password,
        phoneNumber,
    });

    await newUser.save();

    return {
        EC: 0,
        data: newUser,
        message: 'User registered successfully',
        statusCode: 200,
    };
}

module.exports = {
    getAllUser, getUserById, getUserByEmail, createUser, updateUserByID, deleteUserByID,
    handleUserLogin, handleUserRegister,
}
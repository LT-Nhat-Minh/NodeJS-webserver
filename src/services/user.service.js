const User = require('../models/user');


const getAllUser = async () => {
    try {
        const result = await User.find({});
        return result;
    }
    catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

const getUserById = async (id) => {
    try {
        const result = await User.findById({ _id: id });
        if (!result) {
            throw new Error('User not found');
        }
        return result;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

const getUserByEmail = async (email) => {
    try {
        const result = await User.find({ email: email });
        if (!result) {
            throw new Error('User not found');
        }
        return result;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

const createUser = async (data) => {
    try {
        const user = await User.create(data);
        console.log('User created:', user); // This should log the created user
        return user;
    } catch (error) {
        console.error('Error creating user:', error); // This should log any error that occurs
        throw error;
    }
}

const updateUserByID = async (id, data) => {
    try {
        console.log('Updating user with ID:', id, 'and data:', data);
        const result = await User.findOneAndUpdate({ _id: id }, data);
        if (!result) {
            throw new Error('User not found');
        }
        return result;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
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
        return result;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
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

    return newUser;
}

module.exports = {
    getAllUser, getUserById, getUserByEmail, createUser, updateUserByID, deleteUserByID,
    handleUserLogin, handleUserRegister,
}
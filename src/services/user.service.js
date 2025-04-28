const connection = require('../config/database');

const getAllUsers = async () => {
    try {
        const [results, fields] = await connection.promise().query('SELECT * FROM Users');
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        return results;
    }
    catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

module.exports = {
    getAllUsers
}
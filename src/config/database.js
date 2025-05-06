// Get the client
const dotenv = require('dotenv');
const mongoose = require('mongoose');

var dbState = [{
    value: 0,
    label: "disconnected"
},
{
    value: 1,
    label: "connected"
},
{
    value: 2,
    label: "connecting"
},
{
    value: 3,
    label: "disconnecting"
}];

const connection = async () => {
    try {
        console.log('Connecting to MongoDB...');
        const options = {
            dbName: process.env.DB_NAME,
        };
        await mongoose.connect(process.env.DB_HOST, options);

        //check connection state
        // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
        const state = Number(mongoose.connection.readyState);
        console.log(dbState.find(f => f.value === state).label, "to db"); // connected to db
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = connection;
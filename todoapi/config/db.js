const mongoose = require('mongoose');
require('dotenv').config();


const username = encodeURIComponent(process.env.MONGO_USERNAME);
const password = encodeURIComponent(process.env.MONGO_PASS);
const cluster = process.env.MONGO_CLUSTER;
const database = process.env.MONGO_DB;
const url = `mongodb+srv://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority`;

const connectDB = async () => {
    try {
        console.log('Trying to connect to the database')
        return await mongoose.connect(url, {});
    } catch (err) {
        console.log('it is not able to connect to the database')
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;
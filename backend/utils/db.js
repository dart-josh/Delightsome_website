const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Mongodb connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error connecting to mongodb: ${error.message}`);
        process.exit(1);
    }
};

module.exports = { connectDB };
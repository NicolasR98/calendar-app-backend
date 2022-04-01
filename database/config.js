const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT);

        console.log('DB Online');

    } catch (err) {
        console.error(err);
        throw new Error('Error initializing the DB');
    }
};

module.exports = {
    dbConnection,
};

const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://admin:leelumarybenny09@cluster0.yqslmox.mongodb.net/Jewellery';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');
        const fetched_data = await mongoose.connection.db.collection('products');
        fetched_data.find({}).toArray(function (err, data) {
            if (err) {
                console.error('Error fetching data:', err);
            } else {
                console.log('Fetched data:', data);
            }
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = mongoDB;

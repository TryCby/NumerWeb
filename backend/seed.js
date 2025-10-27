require('dotenv').config();
const mongoose = require('mongoose');
const Bisection = require('./model'); // โมเดล Bisection

const problemData = [
    { id: 1, fx: 'x^4 - 13', xl: 1.5, xr: 2, error: 0.000001 },
    { id: 2, fx: 'x^2 - 7', xl: 1, xr: 2, error: 0.000001 },
    { id: 3, fx: '43x - 180', xl: 2, xr: 3, error: 0.000001 },
    { id: 4, fx: 'x^2 - 38', xl: 0, xr: 3, error: 0.000001 }
];

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('✅ Connected to MongoDB for seeding');

        await Bisection.deleteMany({});
        console.log('🗑️  Cleared existing data in Bisection collection');

        await Bisection.insertMany(problemData);
        console.log('🌱 Seeded Bisection collection with sample data');

        mongoose.disconnect();
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error during seeding:', err);
    });

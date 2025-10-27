require('dotenv').config();
const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors');
const Bisection = require('./model');

const app = express();
const PORT = process.env.PORT
const HOST = process.env.HOST

app.use(cors({ origin: HOST }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => { console.log('✅ Connected to MongoDB'); })
    .catch((err) => { console.error('❌ MongoDB connection error:', err); });

app.get('/api/numerical', async (req, res) => {
    try {
        const data = await Bisection.find({})
                                    .sort({ id: 1 })
                                    .select('-_id -__v');
        return res.setHeader('Content-Type', 'application/json')
            .send(JSON.stringify({ data }, null, 2)); 
    } catch (err) {
        console.error('Error fetching all data:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/numerical/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const data = await Bisection.findOne({ id: id }).select('-_id -__v'); 
        if (!data) return res.status(404).json({ error: 'Data not found' });
        return res.json({ data });
    } catch (err) {
        console.error('Error fetching data by ID:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(PORT, () => { 
    console.log(`🚀 Server is running on http://localhost:${PORT}`); 
});

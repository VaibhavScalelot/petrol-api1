const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

dotenv.config();
const connectDB = require('./config/db');
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/petrolpumps', require('./routes/petrolPump'));

app.get('/', (req, res) => res.send('Petrol Pump API is running'));

// 🔥 TEST MONGO DB CONNECTION ROUTE
app.get('/test-db', (req, res) => {
    const state = mongoose.connection.readyState;

    /*
    0 = disconnected
    1 = connected
    2 = connecting
    3 = disconnecting
    */

    if (state === 1) {
        res.json({ connected: true, message: "MongoDB Connected Successfully" });
    } else {
        res.json({ connected: false, message: "MongoDB Not Connected", state });
    }
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

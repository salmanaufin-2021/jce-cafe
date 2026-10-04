const User = require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/loginDB')
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((error) => {
        console.log('MongoDB connection error:', error);
    });

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = new User({
            username: username,
            password: password
        });

        await user.save();

        res.json({ message: 'User registered successfully' });
    } catch (error) {
        res.json({ message: 'Registration failed' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username: username });

        if (!user) {
            return res.json({ message: 'Invalid username or password' });
        }

        if (user.password !== password) {
            return res.json({ message: 'Invalid username or password' });
        }

        res.json({ message: 'Login successful' });

    } catch (error) {
        res.json({ message: 'Login failed' });
    }
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/config');
const { userRouter } = require('./routes/userRoutes');
const { connectDb, sequelize } = require('./config/dbConnection');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev')); // Logging middleware


app.get('/',(req, res) => {
    res.send('this is home');
})

// Routes
app.use('/user',userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const startServer = async () => {
    try {
        await connectDb();
        app.listen(config.app.port, () => {
            console.log(`Server is listening on port ${config.app.port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

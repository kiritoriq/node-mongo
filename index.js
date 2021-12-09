require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { db } = require('./db');
const authRouter = require('./routes/authRoutes');

const app = express();

// Middleware (using morgan)
app.use(express.urlencoded({ extended: true }));
// middleware
if(process.env.APP_ENV === 'local') {
    app.use(morgan('tiny'));
}

// Listening App
db
    .then(resp => {
        console.log('MongoDB Connected: ' + process.env.DB_URI);
        app.listen(process.env.APP_PORT);
        console.log('Listening on port ' + process.env.APP_PORT + '...');
    })
    .catch(err => {
        console.log(err);
    })

app.use('/api', authRouter);

// 404 not found
app.use((req, res) => {
    if(res.status(404)) {
        res.json({
            message: 'Not Found',
            code: 404
        });
    }
})
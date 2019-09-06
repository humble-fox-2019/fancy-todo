if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

const mongoose = require('mongoose');
const express = require('express');
// const indexRouter = require('./routes');
// const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/hacktivGit', { useNewUrlParser: true });

app.get('/', (req, res) => {
    res.status(200).json({
        "message": 'ok'
    });
});

// app.use('/gits', gitsRouter);

// app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
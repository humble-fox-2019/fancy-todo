if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

const mongoose = require('mongoose');
const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const errorHandler = require('./middlewares/errorHandler');

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true });

app.use('/', routes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
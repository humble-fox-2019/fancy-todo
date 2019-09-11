if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const router = require('./routes/indexRoutes');
const errorHandling = require('./middlewares/errorHandler');
const mongoose = require('mongoose');
const db = process.env.DB || 'mongodb://localhost/fancytodo';

mongoose.connect(db, { useNewUrlParser: true, useFindAndModify: false }, function (err) {
    if (!err) { 
        console.log(`connected to database`);
    } else {
        console.log(err);
    }
})

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', router);
app.use(errorHandling);

app.listen(port, function () {
    console.log(`Listening on port : ${port}, and running on enviroment ${process.env.NODE_ENV}`);
})
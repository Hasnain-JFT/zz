const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const dbconfig = require('./config/database.config');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/routes.js');

mongoose.connect(dbconfig.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true}).then((err) => {
    if(err) {
        console.log(err);
    } else {
        console.log("DB connected");
    }
    
})

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use('/',apiRoutes)


const PORT =  process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server Started");
})





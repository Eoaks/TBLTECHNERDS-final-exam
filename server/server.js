const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 3333;
const routes = require("./routes");
require('dotenv').config();

//body parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api', routes);

//setup mongodb
mongoose.connect(process.env.ATLAS_URI, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('database connected successfully');
});

app.listen(port, function() {
    console.log("App running on port: "+ port);
})
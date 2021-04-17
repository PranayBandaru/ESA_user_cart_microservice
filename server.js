'use strict'
const mongoose = require("mongoose");
const express = require("express");
const app = express();
var routes = require('./api/routes'); 
const port = 4000;
app.use(express.json());
mongoose.connect("mongodb+srv://admin:admin@cluster0.at51m.mongodb.net/User_cart_microservice?retryWrites=true&w=majority",
    {useNewUrlParser:  true,
    useFindAndModify: false,
    useUnifiedTopology:  true,}).then(() => {
        console.log("Connected to Database");
}, 
err => {
    {
        console.log("Error: ", err);
    }
});

routes(app);
app.get('/', (req, res) => {
    res.send("User Cart Microservice. Refer provided documentation for usage.");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

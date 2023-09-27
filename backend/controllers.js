/*jslint browser:true*/
/*global process */
/* jslint node */
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const accountRoutes = require('./routes/account');
const editDataRoutes = require('./routes/editData');
const changePasswordRoutes = require('./routes/changepassword');
const profilePictureRoutes = require('./routes/profilepicture_upload');
const getImageRoutes = require('./routes/getImage');

app.get('/account', accountRoutes);
app.put('/editdata', editDataRoutes);
app.put('/changepassword', changePasswordRoutes);
app.post('/upload', profilePictureRoutes);
app.get('/url/:filename/:id', getImageRoutes);

module.exports = app;

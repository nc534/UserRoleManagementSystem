const express = require("express");
const app = express();
const mysql = require('@mysql/xdevapi');

require("dotenv").config();

//connect to MySQL db
mysql.getSession({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    schema: process.env.DB,
    port: process.env.PORT
}).then(() => {
    console.log("Connected to database...")
}).catch((err) => {
    if(err) {
        console.error(err.message);
    }
})

//listen to the server and send a message to ensure server started
app.listen(3000, () => {
    console.log("Server started...");
})
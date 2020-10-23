const express = require("express");
const app = express();

//listen to the server and send a message to ensure server started
app.listen(3000, () => {
    console.log("Server started...");
})
const express = require("express");
const app = express();

//middleware in order for the server to accept request objects as json objects
app.use(express.json());

const userRouter = require('./routes/users');
app.use('/users', userRouter);

//listen to the server and send a message to ensure server started
app.listen(3000, () => {
    console.log("Server started on port 3000...");
})
const express = require("express");
const app = express();
const cors = require("cors");

//middleware in order for the server to accept request objects as json objects
app.use(express.json());

//connect to frontend
app.use(cors({
    origin: "http://localhost:4200"
}));

const userRouter = require('./routes/users');
app.use('/users', userRouter);

//listen to the server and send a message to ensure server started
app.listen(process.env.PORT || 3000, () => {
    console.log("Server started on port 3000...");
})
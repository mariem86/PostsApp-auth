const express = require("express");
require("dotenv").config({ path: "./config/.env" });

const colorLog = require("./utils/colorLog");
const connectDB = require("./config/connectDB");
const userRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const app = express();


//middlewares
app.use(express.json());

//connect The DB
connectDB();

//Routes
app.use("/api/auth", userRouter);
app.use("/api/posts", postRouter);

//Lunch the server
const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  err
    ? console.log(err)
    : colorLog(`The Server is running on port ${port}....`);
});
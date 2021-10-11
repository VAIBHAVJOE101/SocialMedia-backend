const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true} , ()=>{
      console.log("MongoDB Connected ...");
});

//middleware
app.use(express.json());
app.use(helmet());
// app.use(morgan("common"));

app.use("/api/users" , usersRoute);
app.use("/api/auth" , authRoute);
app.use("/api/posts" , postsRoute);

app.listen(8880 , (req,res) =>{
      console.log("The server is up and running on port 8880.");
})
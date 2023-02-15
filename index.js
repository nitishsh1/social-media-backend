import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors'
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'
import ConversationRoute from './Routes/ConversationRoute.js'
import MessageRoute from './Routes/MessageRoute.js'
// routes 



const app = express();

// to serve images for public
app.use(express.static('public'));
app.use('/images',express.static('images'));

// middlewares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())

dotenv.config();
mongoose.set("strictQuery", false);

mongoose.connect(
  process.env.MONGO_DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to mongobd successfully");
  }
);

const PORT = process.env.PORT;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Listening to PORT ${PORT}`);
});

// usage of routes

app.use('/auth' , AuthRoute);
app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use('/conversation',ConversationRoute)
app.use('/message', MessageRoute);
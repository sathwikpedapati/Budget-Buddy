const express = require("express");
const cors = require('cors');
const session= require("express-session");
const dotenv= require("dotenv");
const userRoute=require("./routes/userRoute")
const transcationRoute= require("./routes/transcationRoute");
const connectDb = require("./config/connectDb");
const passport= require("passport");
const LocalStrategy=require("passport-local");
const User = require("./models/userModel");
dotenv.config();
connectDb();
const app = express();
const port =8080|| process.env.PORT;
app.use(express.json());
app.use(
  session({
    secret: "mysecretstring",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(cors());
app.use("/api/v1/users",userRoute);
app.use("/api/v1/transcations",transcationRoute)
app.listen(port,()=>{
    console.log(`server is listening ${port}`)
});

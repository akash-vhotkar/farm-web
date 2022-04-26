const express = require("express");
const app = express();
const cookieParser = require("cookie-parser") 
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const cors=require('cors')

const errorMiddleware = require("./middleware/error")

app.use(express.json());
app.use(cors({origin:"*"} ))
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());
// app.use((req,res,next)=>{ // cors
//     res.setHeader('Acces-Control-Allow-Origin','*');
//     res.setHeader('Acces-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
//     res.setHeader('Acces-Contorl-Allow-Methods','Content-Type','Authorization');
//     next(); 
// })
//Route imports

const product = require("./routes/productRoute")
const user = require("./routes/userRoute")
const order = require("./routes/orderRoute")
const payment=require("./routes/paymentRoute")

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1/",payment)

//Middleware for error
app.use(errorMiddleware);

module.exports = app
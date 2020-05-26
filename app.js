const env = require("dotenv").config();
const express = require("express");
const app = express();
const sequelize = require("./db");
const router = require("./controller/usercontroller");
const Log = require("./controller/logcontroller");


sequelize.sync();
app.use(express.json());
app.use(require("./middleware/header"));



app.use("/user",router);
app.use(require("./middleware/validate")); 
//validating everything below
app.use(require("./middleware/validate"));
app.use("/log",Log);

//listening
app.listen(process.env.PORT,()=>{
    console.log(`Listening to ${process.env.PORT}`);
}
);

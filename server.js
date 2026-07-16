require("dotenv").config();

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));

app.use(cors());

app.use(session({

    secret:"BARP_SESSION_SECRET",

    resave:false,

    saveUninitialized:false

}));

app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{

    res.sendFile(path.join(__dirname,"public","login.html"));

});

const PORT=process.env.PORT || 10000;

app.listen(PORT,()=>{

    console.log("================================");

    console.log(" Buenos Aires RP");

    console.log(" Panel RRHH iniciado");

    console.log(" Puerto:",PORT);

    console.log("================================");

});

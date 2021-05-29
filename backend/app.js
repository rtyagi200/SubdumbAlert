const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const app = express();

//Path to config.env
dotenv.config({path: './config/config.env'});

//Use body parser
app.use(bodyParser.json());

//Use Cookie Parser
app.use(cookieParser());

//Load all routes
const userRouter = require('./routes/users');
const domainRouter = require('./routes/domains');
const subdomainRouter = require('./routes/subdomain');

//Use routes
app.use('/api/users', userRouter);
app.use('/api/domains', domainRouter);
app.use('/api/subdomains', subdomainRouter);

//connect to database
require('./database/conn');

if(process.env.NODE_ENV == "production"){
    app.use(express.static("frontend/build"));
    const path = require('path');
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'));
    })
}


//Listening on port
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`App listening on Port ${PORT}`);
})
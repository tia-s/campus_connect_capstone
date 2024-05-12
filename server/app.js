const express = require('express');
const config = require('./config/parameters');
const routers = require('./routers/index');
const cors = require('cors');
const session = require('express-session');
const secretKey = process.env.JWT_SECRET;

const app = express();
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true
}));

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration




app.use('/api', routers); 

const port = config.server.port || 5000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


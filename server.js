require("dotenv").config();
const express =require('express');
//const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet'); //security
const app = express();
const PORT= process.env.APP_PORT;
     
//app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
    res.json({message:"Hello, One to One Relation"});
});

const db = require("./models");
db.sequelize.sync({force: true}).then(() => {
	console.log('Sync...');
  //console.log('Drop and Resync Database with { force: true }');
});

require('./routes/employee.route')(app);
     
app.listen(PORT, ()=>{
    console.log(`server is listening  on ${PORT}`);
});
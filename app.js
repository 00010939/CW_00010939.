const express = require('express');
const exphbs=require('express-handlebars');
const bodyParser=require('body-parser');
const mysql=require('mysql');
//const Connection = require('mysql/lib/Connection');

require('dotenv').config();
const app = express();

const port=process.env.PORT || 5000;
// Parsing middleware
// Parse application/x-www-form-urlencoded


app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

// Static Files
app.use(express.static('public'));

// Templating Engine
const handlebars = exphbs.create({ extname: '.hbs', });
app.engine('.hbs', handlebars.engine);
app.set('view engine', 'hbs');


// Connection Pool
const pool = mysql.createPool({
 connectionLimit : 100,
 host            : process.env.DB_HOST,
 database        : process.env.DB_NAME,   
 password        : process.env.DB_PASS,
 user            : process.env.DB_USER    
});


//  Connect to DB
pool.getConnection((err, connection) => {
    if(err) throw err; // not connected!
    console.log('Connected as ID ' + connection.threadId);
});





const routes = require('./server/routes/student');
app.use('/', routes);


app.listen(port,()=>console.log(`Listening on port ${port}`));

const mysql = require('mysql');

// Connection Pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    database        : process.env.DB_NAME,   
    password        : process.env.DB_PASS,
    user            : process.env.DB_USER    
   });

// View Users
exports.view = (req, res) => {


pool.getConnection((err, connection) => {
       if(err) throw err; // not connected!
       console.log('Connected as ID  ' + connection.threadId);
   
    // USer the connection
      connection.query('SELECT * FROM user WHERE status = "active"', (err, rows) =>{
       //Connection is done, release it
       connection.release();

       if(!err) {
           res.render('home', { rows });
       } else{
           console.log(err);
       }
         
       console.log('The data from user table: \n', rows);
      });                                                        
   });
}


//Find Student by search
exports.find = (req, res) => {




}
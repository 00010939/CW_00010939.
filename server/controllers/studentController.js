const mysql = require('mysql');

// Connection Pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    user: process.env.DB_USER
});

// View Students
exports.view = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID  ' + connection.threadId);

        // Student the connection
        connection.query('SELECT * FROM user WHERE status = "active"', (err, rows) => {
            //Connection is done, release it
            connection.release();

            if (!err) {
                res.render('home', { rows });
            } else {
                console.log(err);
            }

            console.log('The data from user table: \n', rows);
        });
    });
}


//Find Student by search
exports.find = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID ' + connection.threadId);
        let searchTerm = req.body.search;

        // Student the connection
        connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            //Connection is done, release it
            connection.release();

            if (!err) {
                res.render('home', { rows });
            } else {
                console.log(err);
            }

            console.log('The data from user table: \n', rows);
        });
    });
}


exports.form = (req, res) => {
    res.render('add-student');
}


//Add new Student 
exports.create = (req, res) => {
    const { first_name, last_name, email, phone, comments } = req.body;


    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID ' + connection.threadId);


        let searchTerm = req.body.search;

        // Student the connection
        connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?',[first_name, last_name, email, phone, comments], (err, rows) => {
            //Connection is done, release it
            connection.release();

            if (!err) {
                res.render('add-student', { alert: 'Student added successfully.' });
            } else {
                console.log(err);
            }

            console.log('The data from user table: \n', rows);
        });
    });
}





//Edit Student 
exports.edit = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID  ' + connection.threadId);

        // Student the connection
        connection.query('SELECT * FROM user WHERE id =?', [req.params.id], (err, rows) => {
            //Connection is done, release it
            connection.release();

            if (!err) {
                res.render('edit-student', { rows });
            } else {
                console.log(err);
            }

            console.log('The data from user table: \n', rows);
        });
    });
}


//Update Student 
exports.update = (req, res) => {
 const { first_name, last_name, email, phone, comments } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID  ' + connection.threadId);

        // Student the connection
        connection.query('UPDATE user SET  first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id =? ', [first_name, last_name, email, phone, comments, req.params.id ], (err, rows) => {
            //Connection is done, release it
            connection.release();

            if (!err) {
                // res.render('edit-student', { rows });

                pool.getConnection((err, connection) => {
                    if (err) throw err; // not connected!
                    console.log('Connected as ID  ' + connection.threadId);
            
                    // Student the connection
                    connection.query('SELECT * FROM user WHERE id =?',[req.params.id], (err, rows) => {
                        //Connection is done, release it
                        connection.release();
            
                        if (!err) {
                            res.render('edit-student', { rows, alert: `${first_name} has been updated.` });
                        } else {
                            console.log(err);
                        }
            
                        console.log('The data from user table: \n', rows);
                    });
                });
            } else {
                console.log(err);
            }

            console.log('The data from user table: \n', rows);
        });
    });
}





//Delete Student 
exports.delete = (req, res) => {
    // pool.getConnection((err, connection) => {
    //     if (err) throw err; // not connected!
    //     console.log('Connected as ID  ' + connection.threadId);

    //     // Student the connection
    //     connection.query('DELETE FROM user WHERE id =?', [req.params.id], (err, rows) => {
    //         //Connection is done, release it
    //         connection.release();

    //         if (!err) {
    //            res.redirect('/');
    //         } else {
    //             console.log(err);
    //         }

    //         console.log('The data from user table: \n', rows);
    //     });
    // });



    pool.getConnection((err, connection) => {
        if (err) throw err; 
            connection.query('UPDATE user SET status = ? WHERE id =?', ['removed', req.params.id], (err, rows) => {
            connection.release();
            if (!err) {
               res.redirect('/');
            } else {
                console.log(err);
            }

            console.log('The data from user table: \n', rows);
        });
    });
}




// View Students
exports.viewall = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID  ' + connection.threadId);

        // Student the connection
        connection.query('SELECT * FROM user WHERE id =?', [req.params.id], (err, rows) => {
            //Connection is done, release it
            connection.release();

            if (!err) {
                res.render('view-student', { rows });
            } else {
                console.log(err);
            }

            console.log('The data from user table: \n', rows);
        });
    });
}
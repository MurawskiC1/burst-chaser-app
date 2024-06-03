const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const table = "pulse_shape"
// Initialize the Express application
const app = express();


// Create a connection to the database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Cartbellot4tis",
    database: "burst_chaser"
});

// Connect to the database and handle any connection errors
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database as id ' + db.threadId);
});

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Define a simple route
app.get('/', (req, res) => {
    res.send('Welcome to the Express server!');
});

// Define a route to fetch data from the new_table
app.get(`/${table}`, (req, res) => {
    const filter = req.query.filter;// Get filter value from query parameter
    const sort = req.query.sort;
    let select = `SELECT * FROM ${table}`;
    let order = "";
    let where = "";
    if (sort !== '') {
        order += ` ORDER BY ${sort}`
    }

    if (filter !== '') {
        where += ` WHERE ${filter}`;
    }
    const q = select + where + order
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data); // Return the data to the client
    });
});



app.post(`/${table}`, (req, res) => {
    const q = "INSERT INTO new_table (`name`, `description`, `number`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.description,
        req.body.number,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Successful Data Creation");
    });
});

// Start the server on port 8800
const PORT = 8800;
app.listen(process.env.PORT | gi | PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

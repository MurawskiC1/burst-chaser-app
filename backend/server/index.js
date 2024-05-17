const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const table = "new_table"
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
    const q = "SELECT * FROM new_table";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data); // return the data to the client
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
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

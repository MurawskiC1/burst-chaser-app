const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const table = "pulse_shape"

// Initialize the Express application
const app = express();

// Create a connection to the database
const db = mysql.createConnection({
    host: "burstchaser.chc6og84q0nv.us-east-2.rds.amazonaws.com",
    user: "burstchaser",
    password: "Cartbellot4ti$",
    database: "burstchaser",
    port: 3306
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

// Define a route to fetch data from the pulse_shape table
app.get(`/${table}`, (req, res) => {
    const filter = req.query.filter || ''; // Get filter value from query parameter
    const sort = req.query.sort || ''; // Get sort value from query parameter
    let select = `SELECT * FROM ${table}`;
    let order = "";
    let where = "";

    if (sort) {
        order = ` ORDER BY ${sort}`;
    }

    if (filter) {
        where = ` WHERE ${filter}`;
    }

    const q = select + where + order;
    db.query(q, (err, data) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: err.message });
        }
        return res.json(data); // Return the data to the client
    });
});

app.put('/update', (req, res) => {
    const { id, classification } = req.body;

    // Construct the SQL query to increment the classification category
    const sql = `UPDATE pulse_shape SET ${classification} = ${classification} + 1 WHERE Burst_Name = ?`;

    // Execute the SQL query with the id parameter
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error updating pulse shape:', err);
            res.status(500).json({ error: 'Failed to update pulse shape' });
        } else {
            res.status(200).json({ message: 'Pulse shape updated successfully' });
        }
    });
});




// Define a route to fetch data from the comments table
app.get(`/comments`, (req, res) => {
    const filter = req.query.filter || ''; // Get filter value from query parameter
    const sort = req.query.sort || ''; // Get sort value from query parameter
    let select = `SELECT * FROM comments`; // Ensure correct table name
    let order = "";
    let where = "";

    if (sort) {
        order = ` ORDER BY ${sort}`;
    }

    if (filter) {
        where = ` WHERE ${filter}`;
    }

    const q = select + where + order;
    db.query(q, (err, data) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: err.message });
        }
        return res.json(data); // Return the data to the client
    });
});

app.get(`/tags`, (req, res) => {
    const filter = req.query.filter || ''; // Get filter value from query parameter
    const sort = req.query.sort || ''; // Get sort value from query parameter
    let select = `SELECT * FROM tags`; // Ensure correct table name
    let order = "";
    let where = "";

    if (sort) {
        order = ` ORDER BY ${sort}`;
    }

    if (filter) {
        where = ` WHERE ${filter}`;
    }

    const q = select + where + order;
    db.query(q, (err, data) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: err.message });
        }
        return res.json(data); // Return the data to the client
    });
});
// Define a route to insert data into the pulse_shape table
app.post(`/comments`, (req, res) => {
    const q = `INSERT INTO comments (\`comment_id\`, \`comment_body\`, \`comment_focus_id\`,\`comment_user_id\`,\`comment_user_login\`,\`comment_created_at\`,\`votes\`) VALUES (?)`;
    const values = [
        req.body.comment_id,
        req.body.comment_body,
        req.body.comment_focus_id,
        req.body.comment_user_id,
        req.body.comment_user_login,
        req.body.comment_created_at,
        req.body.votes
    ];

    db.query(q, [values], (err, data) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: err.message });
        }
        return res.json("Successful Data Creation");
    });
});



// Start the server on port 8800
const PORT = 8800;
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

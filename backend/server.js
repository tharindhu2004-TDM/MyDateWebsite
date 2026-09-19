const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// ===============================
// MySQL Database Connection
// ===============================

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
});

db.connect((err) => {
    if (err) {
        console.log("MySQL connection failed:", err);
        return;
    }

    console.log("MySQL connected successfully!");
});

// ===============================
// Test Route
// ===============================

app.get("/", (req, res) => {
    res.send("Date Website Backend is Running!");
});

// ===============================
// Save Date Response
// ===============================

app.post("/api/date", (req, res) => {

    const {
        date,
        time,
        activity,
        place
    } = req.body;

    console.log("Received data:", {
        date,
        time,
        activity,
        place
    });

    const sql = `
        INSERT INTO date_responses
        (date_value, time_value, activity, place)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [date, time, activity, place],
        (err, result) => {

            if (err) {

                console.log(
                    "Database insert error:",
                    err
                );

                return res.status(500).json({
                    message: "Failed to save data"
                });
            }

            console.log(
                "Date data saved successfully!"
            );

            res.json({
                message: "Date saved successfully!",
                id: result.insertId
            });
        }
    );
});

// ===============================
// Get All Date Responses
// ===============================

app.get("/api/date", (req, res) => {

    const sql = `
        SELECT *
        FROM date_responses
        ORDER BY created_at DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {

            console.log(
                "Database read error:",
                err
            );

            return res.status(500).json({
                message: "Failed to get data"
            });
        }

        res.json(results);
    });
});

// ===============================
// Start Server
// ===============================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});
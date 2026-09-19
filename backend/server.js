const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// =====================================
// CHECK ENVIRONMENT VARIABLES
// =====================================

console.log("========== DATABASE ENV CHECK ==========");

console.log("DB HOST:", process.env.DB_HOST);
console.log("DB NAME:", process.env.DB_NAME);
console.log("DB PORT:", process.env.DB_PORT);
console.log("DB USER:", process.env.DB_USER);

console.log("MYSQL HOST:", process.env.MYSQLHOST);
console.log("MYSQL DATABASE:", process.env.MYSQLDATABASE);
console.log("MYSQL PORT:", process.env.MYSQLPORT);
console.log("MYSQL USER:", process.env.MYSQLUSER);

console.log("========================================");

// =====================================
// DATABASE CONFIGURATION
// =====================================

// Railway MySQL variables available නම්
// ඒවා use කරනවා.
//
// DB_* variables available නම් ඒවා fallback එකක් විදිහට use කරනවා.

const DB_HOST =
    process.env.MYSQLHOST ||
    process.env.DB_HOST;

const DB_USER =
    process.env.MYSQLUSER ||
    process.env.DB_USER;

const DB_PASSWORD =
    process.env.MYSQLPASSWORD ||
    process.env.DB_PASSWORD;

const DB_NAME =
    process.env.MYSQLDATABASE ||
    process.env.DB_NAME;

const DB_PORT =
    Number(process.env.MYSQLPORT) ||
    Number(process.env.DB_PORT) ||
    3306;

// =====================================
// FINAL DATABASE CONFIG CHECK
// =====================================

console.log("========== FINAL DATABASE CONFIG ==========");

console.log("FINAL DB HOST:", DB_HOST);
console.log("FINAL DB NAME:", DB_NAME);
console.log("FINAL DB PORT:", DB_PORT);
console.log("FINAL DB USER:", DB_USER);

console.log("===========================================");

// =====================================
// MYSQL CONNECTION
// =====================================

const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT
});

// =====================================
// CONNECT MYSQL
// =====================================

db.connect((err) => {

    if (err) {

        console.log("MySQL connection failed:");
        console.log(err);

        return;
    }

    console.log("================================");
    console.log("MySQL connected successfully!");
    console.log("================================");

});

// =====================================
// TEST ROUTE
// =====================================

app.get("/", (req, res) => {

    res.send("Date Website Backend is Running!");

});

// =====================================
// SAVE DATE RESPONSE
// =====================================

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

    // Check required fields

    if (
        !date ||
        !time ||
        !activity ||
        !place
    ) {

        return res.status(400).json({

            message: "All fields are required"

        });

    }

    // SQL query

    const sql = `
        INSERT INTO date_responses
        (
            date_value,
            time_value,
            activity,
            place
        )
        VALUES (?, ?, ?, ?)
    `;

    // Insert data

    db.query(

        sql,

        [
            date,
            time,
            activity,
            place
        ],

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

                message:
                    "Date saved successfully!",

                id:
                    result.insertId

            });

        }

    );

});

// =====================================
// GET ALL DATE RESPONSES
// =====================================

app.get("/api/date", (req, res) => {

    const sql = `
        SELECT *
        FROM date_responses
        ORDER BY created_at DESC
    `;

    db.query(

        sql,

        (err, results) => {

            if (err) {

                console.log(
                    "Database read error:",
                    err
                );

                return res.status(500).json({

                    message:
                        "Failed to get data"

                });

            }

            res.json(results);

        }

    );

});

// =====================================
// START SERVER
// =====================================

const PORT =
    process.env.PORT || 3000;

app.listen(

    PORT,

    () => {

        console.log(
            `Server running on port ${PORT}`
        );

    }

);
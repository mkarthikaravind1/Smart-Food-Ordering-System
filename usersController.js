const bcrypt = require('bcrypt');
// const pool = require('../config/db'); // <-- need to create query like this

const getUsers = async (req, res) => {
    try {
        // MySQL query placeholder:
        // const [rows] = await pool.query("SELECT * FROM users");
        res.json({ message: "Fetch all users placeholder" });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const signupUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if email exists (placeholder)
        // const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        // if (existing.length > 0) return res.status(400).json({ message: "Email already registered" });

        // Hash the password before storing
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // MySQL INSERT query placeholder
        // await pool.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, hashedPassword]);

        res.status(201).json({ message: "User sign up placeholder", user: { username, email } });
    } catch (error) {
        console.error("Error signing up user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // MySQL SELECT query placeholder
        // const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        // if (rows.length === 0) return res.status(401).json({ message: "Invalid credentials" });

        // Compare hashed password (placeholder)
        // const match = await bcrypt.compare(password, rows[0].password);
        // if (!match) return res.status(401).json({ message: "Invalid credentials" });

        // If matched, send user info or role
        res.json({ message: "User login placeholder", email, role: "user" });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getUsers, signupUser, loginUser };


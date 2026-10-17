require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT 



// Parse JSON bodies
app.use(express.json());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// middleware to log every request
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} | ${req.method} ${req.url}`);
  next();
});



// GET 
app.get("/about", (req, res) => {
  res.send("My Week 2 API!");
});

// POST
app.post("/user", (req, res) => {
  const { name, email } = req.body;

  // Error handler there's if missing data
  if (!name || !email) {
    return res.status(400).json({
      error: "Both name and email are required",
    });
  }

  res.send(`Hello, ${name}!`);
});

// GET user id
app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  res.send(`User ${id} profile`);
});

//  Start server 
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
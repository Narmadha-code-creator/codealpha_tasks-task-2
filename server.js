// server.js
const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// In-memory storage for posts
let posts = [];

// API route to get all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// API route to create a new post
app.post("/posts", (req, res) => {
  const { username, content } = req.body;
  if (!username || !content) {
    return res.status(400).json({ message: "Username and content required" });
  }

  const newPost = { id: posts.length + 1, username, content };
  posts.push(newPost);

  res.json({ message: "Post created!", post: newPost });
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Social Media App running on http://localhost:${PORT}`);
});
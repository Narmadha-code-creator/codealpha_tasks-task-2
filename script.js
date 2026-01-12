// Fetch and display posts
function fetchPosts() {
  fetch("/posts")
    .then(res => res.json())
    .then(data => {
      const feed = document.getElementById("feed");
      feed.innerHTML = "";
      data.forEach(post => {
        const div = document.createElement("div");
        div.innerHTML = `<strong>${post.username}</strong>: ${post.content}`;
        feed.prepend(div);
      });
    });
}

// Create a new post
function createPost() {
  const username = document.getElementById("username").value;
  const content = document.getElementById("content").value;

  if (!username || !content) {
    alert("Enter username and content!");
    return;
  }

  fetch("/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, content })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      document.getElementById("content").value = "";
      fetchPosts();
    });
}

// Load posts on page load
fetchPosts();
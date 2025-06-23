# Blog-manager-P1-Code-Challenge
# Overview
This is a JavaScript-based project that connects to a local JSON server to manage blog posts. It showcases API interactions (GET, POST, PATCH, DELETE), dynamic DOM updates, and user interaction handling.

This project is inspired by the Code Challenge: Simple Blog/Post Manager learning goals:

1. Access information from an API using a GET request and use it to update the DOM.

2. Listen for user events and update the DOM in response.

3. (Advanced) Send data to an API using POST, PATCH, and DELETE requests.

# Features
1. Fetch and display all blog posts

2. View post details

3. Add new blog posts

4. Edit existing blog posts

5. Delete blog posts

6. Persist data to a local JSON server

# Technologies Used
HTML5 & CSS3

JavaScript (Vanilla)

JSON Server

Live Server

# Setup Instructions
1. Install Dependencies
npm install -g json-server@0.17.4 live-server

# 2. File Structure
project-folder/
├── index.html
├── css/
│   └── styles.css
├── src/
│   └── index.js
└── db.json
# 3. Sample db.json
{
  "posts": [
    {
      "id": 1,
      "title": "First Post",
      "content": "Welcome to the blog!",
      "author": "Admin"
    }
  ]
}
# 4. Running the App
1. Start JSON server:

json-server db.json

2. Start frontend:
live-server

3. Open your browser at the provided localhost address.

# Usage
1. On load, blog titles are listed.

2. Click a title to view full details.

3. Use the form to add a new post.

4. Edit and delete buttons appear in the detail view.

5. All updates can be persisted to the backend with proper fetch requests.

# Contribution
Feel free to fork this project, make improvements, and open pull requests.

# License
MIT License (https://opensource.org/licenses/MIT)
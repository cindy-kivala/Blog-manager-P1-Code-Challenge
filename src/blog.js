//index js
//1. Main
function displayPosts() {
    console.log("Displaying all blog posts...");
    // code to fetch and display blog posts
}
function addNewPostListener() {
    console.log("Setting up new post listener...");
    //code to listen for new post submissions
}
//Callling my main functions
function main() {
    displayPosts();
    addNewPostListener();
}
// Call main() to run the app
main();
//Wait for the DOM to load before runnning the main function
document.addEventListener("DOMContentLoaded", main);

//displayPosts
function displayPosts() {
    console.log("Displaying all blog posts...");
    //code to fetch and display blog posts
}
fetch ('http://localhost:3000/posts')
    .then(response => response.json())
    .then(posts => {//confirm that the data is being fetched correctly
       const postList = document.querySelector('#post-list');
       postList.innerHTML = ''; // clear existing posts
       
       posts.forEach(post => {
              const postItem = document.createElement('li');
              postItem.classList.add('post-item');
       })
        
       //Create and set the post title
       const postTitle = document.createElement('h3');
       postTitle.textContent = post.title;//CONFIRM THIS
    })

      //create and set the post content
      const content = document.createElement('p');
      content.textContent = post.content;

    //Create and set the post image
       const postImage = document.createElement('img');
       postImage.src = post.image;
       postImage.alt = post.title;
       postImage.style.maxWidth = '100px'; //CONFIRM OPTIMAL WIDTH

    //append each element
       postItem.appendChild(title);
       postItem.appendChild(content);
       postItem.appendChild(postImage);

       postList.appendChild(postItem);
       
    //Click listener to trigger handlePostClick
       postItem.addEventListener('click', () => {
           handlePostClick(post);
    });
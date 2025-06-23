//index js
//MAIN
//const API_URL = 'https://api.disneyapi.dev/character';
const API_URL = 'http://localhost:3000/'
function main() {
    displayPosts();
    addNewPostListener();
}
//Calling my main functions

function displayPosts() {
    console.log("Displaying all blog posts...");
    fetch(`${API_URL}/posts`)
        .then(response => response.json())
        .then(posts => {
            const postList = document.querySelector('#post-list');
            postList.innerHTML = ''; // clear existing posts

            posts.forEach(post => {
                const postItem = document.createElement('li');
                postItem.classList.add('post-item');

                // Create and set the post title
                const postTitle = document.createElement('h3');
                postTitle.textContent = post.title;

                // Create and set the post content
                const content = document.createElement('p');
                content.textContent = post.content;

                // Create and set the post image
                const postImage = document.createElement('img');
                postImage.src = post.image;
                postImage.alt = post.title;
                postImage.style.maxWidth = '100px'; //CONFIRM OPTIMAL WIDTH

                // Append each element
                postItem.appendChild(postTitle);
                postItem.appendChild(content);
                postItem.appendChild(postImage);

                // Click listener to trigger handlePostClick
                postItem.addEventListener('click', () => {
                    handlePostClick(post.id);
                });

                // Add to the post list
                postList.appendChild(postItem);
            });
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
        });
}

//document.addEventListener('DOMContentLoaded', main); //TEST IT
// // Call main() to run the app
// main();
// //Wait for the DOM to load before runnning the main function
// document.addEventListener("DOMContentLoaded", main);

// //displayPosts
// function displayPosts() {
//     console.log("Displaying all blog posts...");
//     fetch('http://localhost:3000/posts')
//         .then(response => response.json())
//         .then(posts => {
//             const postList = document.querySelector('#post-list');
//             postList.innerHTML = ''; // clear existing posts

//             posts.forEach(post => {
//                 const postItem = document.createElement('li');
//                 postItem.classList.add('post-item');

//                 // Create and set the post title
//                 const postTitle = document.createElement('h3');
//                 postTitle.textContent = post.title;

//                 // Create and set the post content
//                 const content = document.createElement('p');
//                 content.textContent = post.content;

//                 // Create and set the post image
//                 const postImage = document.createElement('img');
//                 postImage.src = post.image;
//                 postImage.alt = post.title;
//                 postImage.style.maxWidth = '100px'; //CONFIRM OPTIMAL WIDTH

//                 // Append each element
//                 postItem.appendChild(postTitle);
//                 postItem.appendChild(content);
//                 postItem.appendChild(postImage);

//                 // Click listener to trigger handlePostClick
//                 postItem.addEventListener('click', () => {
//                     handlePostClick(post.id);
//                 });

//                 // Add to the post list
//                 postList.appendChild(postItem);
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching posts:', error);
//         });
// }

    //2. FETCH BY ID => VIEW POST DETAILS
    function handlePostClick(postId) {
        fetch(`${API_URL}/posts/${postId}`)
            .then(response => response.json())
            .then(post => {
                const detailContainer = document.querySelector('#post-detail');
                detailContainer.innerHTML = `
                    <h2>${post.title}</h2>
                    <p><strong>Author:</strong> ${post.author}</p>
                    <img src="${post.image}" alt="${post.title}" style="max-width: 200px;" />
                    <p>${post.content}</p>
                `;
            })
            .catch(error => {
                console.error('Error fetching post detail', error);
            });
    }
    
    //3.Add NewPostListener (LISTEN FOR NEW POST SUBMISSION)
    function addNewPostListener() {
        console.log("Setting up new post listener...");

        const form = document.querySelector('#new-post-form');
         
        if (!form) {
            console.error('#new-post-form not found in the document');
            return;
        }

        form.addEventListener('submit', (event) => {
            event.preventDefault(); //Prevent the default form submission behavior
            
        //4. EXTRACT INPUT VALUES
            const newPost = {
                title: document.querySelector('#title').value,
                author: document.querySelector('#author').value,
                image: document.querySelector('#image').value,
                content: document.querySelector('#content').value
            };
            console.log("Submitted post:", newPost);

        //4. SEND POST REQUEST TO THE SERVER
            fetch(`${API_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPost)
            })
            .then(response => response.json())
            .then(createdPost => {
                console.log("Created post:", createdPost);
                displayPosts(); ///reload the list
                form.reset(); //clear the form inputs
            })
            .catch(error => {
                console.error('Error adding post:', error);
            });
        });
    }

    //Run main() after DOM is fully loaded
    document.addEventListener('DOMContentLoaded', main);



    //crate a post object
        //    const newPost = {
        //     title: title,
        //     content: content,
        //     createdAt: new Date().toISOString()
        //    };
            //add post to UI
            //  const postList = document.querySelector('#post-list');
            //   const postItem = document.createElement('li');
            //   const title = document.createElement('h3');
            //   title.textContent = createdPost.title;

            //   const content = document.createElement('p');
            //   content.textContent = createdPost.content;

            //  const image = document.createElement('img');
            //  image.src = createdPost.image;
            //   image.alt = createdPost.title;
            //   image.style.maxWidth = '100px';

             // append new post
            //  postItem.appendChild(title);
            //  postItem.appendChild(content);
            //  postItem.appendChild(image);

              // listener to view full post
            //   postItem.addEventListener('click', () => {
            //    handlePostClick(createdPost.id);
            //   });

            //  postList.appendChild(postItem);

            //   resetForm();
              
    
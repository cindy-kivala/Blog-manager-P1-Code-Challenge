//index js
//MAIN
//const API_URL = 'https://api.disneyapi.dev/character';
const API_URL = 'http://localhost:3000';
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
                
                // Buttons container
                const buttonBox = document.createElement('div');
                buttonBox.classList.add('button-box');
              
                // Edit Button
                const editBtn = document.createElement('button');
                editBtn.textContent = 'Edit';
                editBtn.onclick = () => {
                    showEditForm(post);
                    // Logic to show the edit form
                    //require confirmation before editing
                    if (confirm(`Are you sure you want to edit post ${post.id}?`))
                    {
                        // Logic to edit the post
                        console.log(`Editing post ${post.id}`);
                    }
                };
                //EDIT BUTTON IS NOT WORKING JUST ALERTING-RESEARCH ON FREE FIME

               // Delete Button
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.onclick = () => {
                    alert(`Delete post ${post.id}`);
                    if (confirm(`Are you sure you want to delete post ${post.id}?`)) {

                        // Logic to delete the post
                        console.log(`Deleting post ${post.id}`);
                    }
                };
                function deletePost(postId) {
  fetch(`${API_URL}/posts/${postId}`, {
    method: 'DELETE'
  })
  .then(() => displayPosts())
  .catch(error => console.error('Error deleting post:', error));
}

function editPost(post) {
  // Populate the form fields with existing post data
  document.querySelector('#title').value = post.title;
  document.querySelector('#author').value = post.author;
  document.querySelector('#image').value = post.image;
  document.querySelector('#content').value = post.content;

  // When submitted, send PATCH instead of POST
  const form = document.querySelector('#new-post-form');
  form.onsubmit = (event) => {
    event.preventDefault();
    const updatedPost = {
      title: form.title.value,
      author: form.author.value,
      image: form.image.value,
      content: form.content.value
    };

    fetch(`${API_URL}/posts/${post.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost)
    })
    .then(() => {
      form.reset();
      form.onsubmit = null; // Remove the edit listener
      addNewPostListener(); // Restore normal new post behavior
      displayPosts();
    });
  };
}
//BUTTONS STLL NOT WORKING!!!!WE TRY AGAIN TOMORROW
//OR ARE MY ALERTS AFFECTING THE BUTTONS?

                // Button Actions
                buttonBox.appendChild(editBtn);
                buttonBox.appendChild(deleteBtn);
                
                //Appennd buttons to postItem
                // postItem.appendChild(editBtn);
                // postItem.appendChild(deleteBtn);

                //Click whole post to view details
                //postItem.onclick = () => handlePostClick(post.id);
                // Append each element
                postItem.appendChild(postTitle);
                postItem.appendChild(content);
                postItem.appendChild(postImage);
                postItem.appendChild(buttonBox);

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
    function showEditForm(post) {
    const editForm = document.querySelector('#editForm');
    editForm.style.display = 'block';

    document.querySelector('#editTitle').value = post.title;
    document.querySelector('#editAuthor').value = post.author;
    document.querySelector('#editImage').value = post.image;
    document.querySelector('#editContent').value = post.content;

    editForm.dataset.postId = post.id; // Save the ID for later on submit
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
    //LISTENER FOR EDIT FORM SUBMISSION
    document.querySelector('#editForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const postId = this.dataset.postId;
    const updatedPost = {
        title: document.querySelector('#editTitle').value,
        author: document.querySelector('#editAuthor').value,
        image: document.querySelector('#editImage').value,
        content: document.querySelector('#editContent').value
    };

    fetch(`${API_URL}/posts/${postId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPost)
    })
    .then(res => res.json())
    .then(() => {
        this.style.display = 'none';
        displayPosts();
    });
});
document.querySelector('#cancelEditBtn').addEventListener('click', () => {
    document.querySelector('#editForm').style.display = 'none';
});

// blog.js
const API_URL = 'http://localhost:3000/films';
let films = []; // local in-memory copy of films
document.addEventListener('DOMContentLoaded', main);

// Main entry
function main() {
  fetchFilms();
  setupEventListeners();
}

document.addEventListener('DOMContentLoaded', main);

// 1. FETCH AND RENDER FILMS
function fetchFilms() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      films = data;
      renderFilmList();
    })
    .catch(err => console.error('Failed to fetch films:', err));
}

function renderFilmList() {
  const postList = document.querySelector('#post-list');
  postList.innerHTML = '';

  films.forEach(film => {
    const li = document.createElement('li');
    li.className = 'post-item';
    li.dataset.id = film.id;

    li.innerHTML = `
      <h3>${film.title}</h3>
      <img src="${film.image}" alt="${film.title}" style="max-width: 100px;" />
       <p><strong>Year:</strong> ${film.year}</p>
      <p><strong>Characters:</strong> ${film.characters.join(', ')}</p>
      <p><strong>Genre:</strong> ${film.genre.join(', ')}</p>
      <div class="button-box">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    li.addEventListener('click', () => renderFilmDetail(film.id));

    const postList = document.querySelector('#post-list');

    postList.prepend(li);//add new post to the TOP instead of bottom

  });

  //show the first film's delatil on load
  if (films.length > 0) {
    renderFilmDetail(films[0].id);
  }
}

// 2. FILM DETAIL VIEW
function renderFilmDetail(filmId) {
    const id = parseInt(filmId);
  const film = films.find(f => f.id === filmId);
  const detail = document.querySelector('#post-detail');
  if (!film) return;

  detail.innerHTML = `
    <h3>${film.title}</h3>
    <img src="${film.image}" alt="${film.title}" class="film-image" max-height="800px" max-width="400px" />
    <p><strong>Year:</strong> ${film.year}</p>
    <p><strong>Characters:</strong> ${film.characters.join(', ')}</p>
    <p><strong>Genre:</strong> ${film.genre.join(', ')}</p>
    <div class="button-box">
      <button id="detail-edit-btn">Edit</button>
      <button id="detail-delete-btn">Delete</button>
    </div>
  `;

   // Set up button listeners
    document.querySelector('#detail-edit-btn').addEventListener('click', () => showEditForm(film));
    document.querySelector('#detail-delete-btn').addEventListener('click', () => {
      if (confirm(`Delete "${film.title}"?`)) {
        deleteFilm(id);
        detail.innerHTML = ''; // Clear the detail view after delete
     }
  });
}

// 3. EVENT DELEGATION FOR BUTTONS
function setupEventListeners() {
  const postList = document.querySelector('#post-list');
  postList.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
      e.stopPropagation();
      const id = parseInt(e.target.closest('li').dataset.id);
      const film = films.find(f => parseInt(f.id) === id);
      showEditForm(film);
    }

    if (e.target.classList.contains('delete-btn')) {
      e.stopPropagation();
      const id = parseInt(e.target.closest('li').dataset.id);
      deleteFilm(id);
    }
  });

  document.querySelector('#editForm').addEventListener('submit', handleEditSubmit);
  document.querySelector('#cancelEditBtn').addEventListener('click', () => {
    document.querySelector('#editForm').style.display = 'none';
  });

  document.querySelector('#new-post-form').addEventListener('submit', handleAddNewFilm);
}

// 4. ADD NEW FILM
function handleAddNewFilm(e) {
  e.preventDefault();

  const form = e.target;
  const newFilm = {
    title: form.title.value,
    image: form.image.value,
    year: parseInt(form.year.value),
    characters: form.characters.value.split(',').map(c => c.trim()),
    genre: form.genre.value.split(',').map(g => g.trim())
  };

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newFilm)
  })
    .then(res => res.json())
    .then(added => {
      films.push(added);
      renderFilmList();
      renderFilmDetail(added.id);
      form.reset();
    });
}

// 5. DELETE FILM
function deleteFilm(id) {
  fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    .then(() => {
      films = films.filter(f => f.id !== id);
      renderFilmList();
    });
}

// 6. EDIT FILM
function showEditForm(film) {
  const form = document.querySelector('#editForm');
  form.style.display = 'block';
  form.dataset.id = film.id;

  form.editTitle.value = film.title;
  form.editImage.value = film.image;
  form.editYear.value = film.year;
  form.editCharacters.value = film.characters.join(', ');
  form.editGenre.value = film.genre.join(', ');
}

function handleEditSubmit(e) {
  e.preventDefault();
  const form = e.target;
  console.log("form.dataset.id:", form.dataset.id);

  const id = parseInt(form.dataset.id);
  if (isNaN(id)) {
    alert("Film ID is missing or invalid. Cannot save changes.");
    return;
  }

  const updated = {
    title: form.editTitle.value,
    image: form.editImage.value,
    year: parseInt(form.editYear.value),
    characters: form.editCharacters.value.split(',').map(c => c.trim()),
    genre: form.editGenre.value.split(',').map(g => g.trim())
  };

  fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updated)
  })
    .then(res => res.json())
    .then(updatedFilm => {
      films = films.map(f => f.id === id ? updatedFilm : f);
      renderFilmList();
      renderFilmDetail(updatedFilm.id);
      form.reset();
      form.style.display = 'none';
    });
}

const API_KEY = "fa11533dc287e0328c693aac9ffe5461";
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1`;
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
}

// Search Area
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);

    search.value = "";
  } else {
    window.location.reload();
  }
});

function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, overview, vote_average } = movie;
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.innerHTML = `
      <img
        src="${IMG_PATH + poster_path}"
        alt="${title}"
      />
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${
      vote_average ? vote_average.toFixed(1) : "N/A"
    }</span>
      </div>
      <div class="overview">
        <h3>${title} <small>Overview</small></h3>
        <p>${overview}</p>
      </div>
    `;
    main.appendChild(movieElement);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

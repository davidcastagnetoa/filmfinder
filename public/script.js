const backendBaseUrl = "http://localhost:3000"
const playBtn = document.getElementById("playBtn");

const getGenres = async () => {
  const urlToFetch = `${backendBaseUrl}/genres`;
  console.log("Fetching genres with URL:", urlToFetch);
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      const genres = jsonResponse.genres;
      console.log(genres);
      return genres;
    }
    throw new Error("Request Failed!");
  } catch (error) {
    console.log(error);
  }
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const urlToFetch = `${backendBaseUrl}/discover/movie?with_genres=${selectedGenre}`;
  console.log("Fetching movies with URL:", urlToFetch);
  try {
    const response = await fetch(urlToFetch);
    console.log("Fetch response:", response);
    if (response.ok) {
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      console.log("Fetched movies:", movies);
      return movies;
    }
    throw new Error("Request Failed!");
  } catch (error) {
    console.log(error);
  }
};

const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const urlToFetch = `${backendBaseUrl}/movie/${movieId}`;
  console.log("Fetching movie info with URL:", urlToFetch);
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const movieInfo = jsonResponse;
      return movieInfo;
    }
    throw new Error("Request failed!");
  } catch (error) {
    console.log(error);
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById("movieInfo");
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }
  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;

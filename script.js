// Get necessary HTML elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const movieContainer = document.getElementById('movie-container');
const videoContainer = document.getElementById('video-container');
const videoPlayer = document.getElementById('video-player');
const closeVideoButton = document.getElementById('close-video');

// Play a click sound when user types in the search box
const clickSound = new Audio('click.mp3');
searchInput.addEventListener('input', () => {
  clickSound.currentTime = 0;
  clickSound.play();
});

// Set a random background GIF on page load
const gifLinks = [
  "./gif/1152147517169293025.gif",
  "./gif/1152147517169293029.gif",
  "./gif/1152147517169293034.gif",
  "./gif/1152147517169293035.gif",
  "./gif/1152147517169293038.gif",
  "./gif/1152147517169293057.gif",
  "./gif/1152147517169293078.gif",
  "./gif/1152147517169293084.gif",
  "./gif/1152147517169293085.gif",
  "./gif/1152147517169293094.gif",
  "./gif/1152147517169293096.gif",
  "./gif/1152147517169293216.gif",
  "./gif/1152147517169293357.gif",
  "./gif/1152147517169293360.gif",
  "./gif/1152147517169293363.gif",
  "./gif/1152147517169293366.gif",
  "./gif/1152147517169293373.gif",
  "./gif/1152147517169293385.gif",
  "./gif/1152147517169293389.gif",
  "./gif/1152147517169293398.gif",
  "./gif/1152147517169293400.gif",
  "./gif/1152147517169295424.gif",
  "./gif/1152147517169295432.gif",
  "./gif/1152147517169295441.gif",
  "./gif/1152147517169295443.gif",
  "./gif/1152147517169295452.gif",
  "./gif/1152147517169316226.gif",
  "./gif/1152147517169316229.gif",
  "./gif/1152147517169316234.gif",
  "./gif/1152147517169316237.gif",
  "./gif/1152147517169316240.gif",
  "./gif/1152147517169316257.gif",
  "./gif/1152147517169316284.gif",
  "./gif/1152147517169316383.gif",
  "./gif/1152147517169316385.gif",
  "./gif/1152147517169316386.gif",
  "./gif/1152147517169316388.gif",
  "./gif/1152147517169316391.gif",
  "./gif/1152147517169316395.gif"
];

window.onload = () => {
  const randomGif = gifLinks[Math.floor(Math.random() * gifLinks.length)];
  document.getElementById('gif-background').style.backgroundImage = `url(${randomGif})`;
};

// Search for movies when user clicks the search button
searchButton.addEventListener('click', () => {
  const searchText = searchInput.value.trim();
  if (searchText) {
    fetchMovies(`https://api.themoviedb.org/3/search/multi?api_key=e6cd252a87b876cd536ccfd719f4483f&query=${encodeURIComponent(searchText)}`);
  }
});

// Fetch movies from the API and display them
function fetchMovies(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      movieContainer.innerHTML = '';
      if (data.results && data.results.length > 0) {
        data.results.forEach(movie => {
          const movieItem = createMovieItem(movie);
          movieContainer.appendChild(movieItem);
        });
      } else {
        movieContainer.innerHTML = '<h2>No movies found.</h2>';
      }
    })
    .catch(() => {
      movieContainer.innerHTML = '<h2>Error fetching movies.</h2>';
    });
}

// Create a movie item element
function createMovieItem(movie) {
  const movieItem = document.createElement('div');
  movieItem.className = 'movie-item';

  const poster = document.createElement('img');
  poster.src = movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : 'placeholder.png';
  poster.alt = movie.title || movie.name || 'Movie';

  const title = document.createElement('h3');
  title.textContent = movie.title || movie.name || 'Movie';

  const watchButton = document.createElement('button');
  watchButton.textContent = 'Watch';
  watchButton.addEventListener('click', () => {
    playMovie(movie);
  });

  movieItem.appendChild(poster);
  movieItem.appendChild(title);
  movieItem.appendChild(watchButton);

  return movieItem;
}

// Play the selected movie
function playMovie(movie) {
  const movieId = movie.id;
  const mediaType = movie.media_type || 'movie';
  const url = `https://streamfr.onrender.com/api/player/${movieId}${mediaType === 'tv' ? '?series=1' : ''}`;
  videoPlayer.src = url;
  videoContainer.style.display = 'flex';
}

// Close the video player
closeVideoButton.addEventListener('click', () => {
  videoPlayer.src = '';
  videoContainer.style.display = 'none';
});
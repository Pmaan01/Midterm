async function fetchData() {
    const apiKey = 'de9f9ba05570dda9362a7b365d4a369b';

    const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=${apiKey}`;
    const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${apiKey}`;
    const topRatedMoviesUrl = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${apiKey}`;
    const upcomingMoviesUrl = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=${apiKey}`;

    try {
        const genreResponse = await fetch(genreUrl);
        const genreJson = await genreResponse.json();
        const genres = genreJson.genres;

        const popularMoviesResponse = await fetch(popularMoviesUrl);
        const popularMoviesJson = await popularMoviesResponse.json();
        displayMovies('popular-movies', popularMoviesJson.results, genres);

        const topRatedMoviesResponse = await fetch(topRatedMoviesUrl);
        const topRatedMoviesJson = await topRatedMoviesResponse.json();
        displayMovies('top-rated-movies', topRatedMoviesJson.results, genres);

        const upcomingMoviesResponse = await fetch(upcomingMoviesUrl);
        const upcomingMoviesJson = await upcomingMoviesResponse.json();
        displayMovies('upcoming-movies', upcomingMoviesJson.results, genres);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


function getGenreNames(genreIds, genres) {
    let genreNames = [];
    for (let id of genreIds) {
        for (let genre of genres) {
            if (genre.id === id) {
                genreNames.push(genre.name);
                break;
            }
        }
    }
    return genreNames.join(', ');
}

function displayMovies(sectionId, movies, genres) {
    const section = document.getElementById(sectionId);
    const moviesContainer = section.querySelector('.movies-container');
    
    moviesContainer.innerHTML = ''; // Clear existing content

    for (const movie of movies) {
        const movieTile = document.createElement('div');
        movieTile.classList.add('movie-tile');
        
        const movieImg = document.createElement('img');
        movieImg.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        movieImg.alt = movie.title;
    
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content');
    
        const movieTitle = document.createElement('h4');
        movieTitle.textContent = movie.title;
    
        const releaseDate = document.createElement('p');
        releaseDate.textContent = `Released: ${movie.release_date}`;

        // Get genre names
        const movieGenres = getGenreNames(movie.genre_ids, genres);

        const genre = document.createElement("p");
        genre.textContent = `Genre: ${movieGenres}`;
    
        const movieOverview = document.createElement('p');
        movieOverview.textContent = `Description: ${movie.overview.substring(0, 50)}...`;

        // Event listener to show full overview on hover
        movieTile.addEventListener('mouseenter', () => {
            movieOverview.textContent = `Description: ${movie.overview}`;
        });
        movieTile.addEventListener('mouseleave', () => {
            movieOverview.textContent = `Description: ${movie.overview.substring(0, 50)}...`;
        });

        contentDiv.appendChild(movieTitle);
        contentDiv.appendChild(releaseDate);
        contentDiv.appendChild(genre);
        contentDiv.appendChild(movieOverview);

        movieTile.appendChild(movieImg);
        movieTile.appendChild(contentDiv);

        moviesContainer.appendChild(movieTile);
    }
}

fetchData();

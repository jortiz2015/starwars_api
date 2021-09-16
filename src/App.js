import React, {useState, useCallback, useEffect} from 'react';
import NewMovie from './components/NewMovie';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(async() => {
    setIsLoading(true);
    setError(null);
    try {
      const resp = await fetch("https://swapi.dev/api/films/")
      if (!resp.ok) {
        throw new Error("Something went wrong!");
      }
      
      const data = await resp.json();

      const movies = data.results.map(film => {
        return {
          id: film.episode_id,
          title: film.title,
          openingText: film.opening_crawl,
          releaseDate: film.release_date
        }
      });
      
      setFilms(movies);
    } catch(error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const addMovieHandler = movie => {
    setFilms(prevFilms => {
      return [movie, ...prevFilms];
    });
  }

  return (
    <React.Fragment>
      <section>
        <NewMovie onAddMovie={addMovieHandler}/>    
      </section>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && error && <p>{error}</p>}
        {!isLoading && films.length > 0 && <MoviesList movies={films} />}
        {!isLoading && films.length === 0 && !error && <p>No movies found</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;

import { Box } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

import MovieCard from '../components/MovieCard';

const MovieList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const fetchedMovies = await axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=1e5238a16446199e1393210ccac016b4");
            setMovies(fetchedMovies.data.results);
        }
        
        fetchMovies();
    }, []);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            mt: 5,
        }}>
            {
                movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie}></MovieCard>
                ))
            }
        </Box>
    );
}

export default MovieList;

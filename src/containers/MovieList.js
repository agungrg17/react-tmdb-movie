import { Box, Button } from '@mui/material';
import { useEffect, useState, useMemo } from 'react';

import tmdb from '../apis/tmdb';
import MovieCard from '../components/MovieCard';
import { useSearchParams } from 'react-router-dom';

// Sort comparators
const sortVoteAverageAsc = (a, b) => a.vote_average - b.vote_average;
const sortVoteAverageDesc = (a, b) => sortVoteAverageAsc(b, a);

// Sorting utility function
const sortVoteAverage = (sort = "asc") =>
    sort === 'asc' ? sortVoteAverageAsc : sortVoteAverageDesc;

const MovieList = () => {
    const [queryParams, setQueryParams] = useSearchParams();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const fetchedMovies = await tmdb.get("trending/movie/week");
                setMovies(fetchedMovies.data.results);
            } catch (error) {
                console.log(error);
            }
        }

        fetchMovies();
    }, []);

    const setSortParam = (type) => {
        queryParams.set("sort", type);
        setQueryParams(queryParams);
    };

    const sort = queryParams.get("sort");

    const sortedMovies = useMemo(() => {
      return movies
        .slice()
        .sort(sortVoteAverage(sort))
    }, [movies, sort]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            mt: 5,
        }}>
            <Box sx={{
                mt: 5,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}>
                Sort by Rating
                <Button
                    variant="contained"
                    sx={{ ml: 2 }}
                    onClick={() => setSortParam("asc")}
                >
                    Asc
                </Button>
                <Button
                    variant="contained"
                    sx={{ ml: 2, mr: 2 }}
                    onClick={() => setSortParam("desc")}
                >
                    Desc
                </Button>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
            }}>
                {
                    sortedMovies.map(movie => (
                        <MovieCard key={movie.id} movie={movie}></MovieCard>
                    ))
                }
            </Box>
        </Box>
    );
}

export default MovieList;


// import { Box, Button } from '@mui/material';
// import { useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';

// import tmdb from '../apis/tmdb';
// import MovieCard from '../components/MovieCard';

// const MovieList = () => {
//     const [queryParams, setQueryParams] = useSearchParams();
//     const [movies, setMovies] = useState([]);
//     const [moviesReady, setMoviesReady] = useState(false);

//     useEffect(() => {
//         const fetchMovies = async () => {
//             try {
//                 const fetchedMovies = await tmdb.get("trending/movie/week");
//                 setMovies(fetchedMovies.data.results);
//                 setMoviesReady(true);
//             } catch (error) {
//                 console.log(error);
//             }
//         }

//         fetchMovies();
//     }, []);

//     useEffect(() => {
//         if (!moviesReady) return;
//         const sortMovies = (type) => {
//             if (type === 'asc') {
//                 const sorted = [...movies].sort((a, b) => a.vote_average - b.vote_average);
//                 setMovies(sorted);
//             }
//             if (type === 'desc') {
//                 const sorted = [...movies].sort((a, b) => b.vote_average - a.vote_average);
//                 setMovies(sorted);
//             }
//         }

//         sortMovies(queryParams.get('sort'));
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [queryParams, moviesReady]);

//     const setSortParam = (type) => {
//         queryParams.set("sort", type);
//         setQueryParams(queryParams);
//     }

//     return (
//         <Box sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             mt: 5,
//         }}>
//             <Box sx={{
//                 mt: 5,
//                 display: 'flex',
//                 flexDirection: 'row',
//                 justifyContent: 'flex-end',
//                 alignItems: 'center',
//             }}>
//                 Sort by Rating
//                 <Button
//                     variant="contained"
//                     sx={{ ml: 2 }}
//                     onClick={() => setSortParam("asc")}
//                 >
//                     Asc
//                 </Button>
//                 <Button
//                     variant="contained"
//                     sx={{ ml: 2, mr: 2 }}
//                     onClick={() => setSortParam("desc")}
//                 >
//                     Desc
//                 </Button>
//             </Box>
//             <Box sx={{
//                 display: 'flex',
//                 flexDirection: 'row',
//                 flexWrap: 'wrap',
//                 justifyContent: 'space-between',
//             }}>
//                 {
//                     movies.map(movie => (
//                         <MovieCard key={movie.title} movie={movie}></MovieCard>
//                     ))
//                 }
//             </Box>
//         </Box>
//     );
// }

// export default MovieList;

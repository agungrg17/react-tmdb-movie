import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { ThemeProvider, Box } from '@mui/material';

import Navbar from './components/Navbar';
import MovieList from './containers/MovieList';
import theme from './themes/theme';
import Pricing from './containers/Pricing';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar></Navbar>
        <Routes>
        <Route path="/" element={<MovieList />} />
          <Route path="about" element={<Box sx={{ mt: 10 }}>Halaman about</Box>} />
          <Route path="indonesian" element={<Box sx={{ mt: 10 }}>Halaman indonesian</Box>} />
          <Route path="pricing" element={<Pricing />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

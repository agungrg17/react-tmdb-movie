import { MovieFilter } from '@mui/icons-material';
import { Link, NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
//import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const navItems = [
  { text: 'Indonesian', link: '/indonesian' },
  { text: 'Pricing', link: '/pricing' },
  { text: 'About', link: '/about' },
];

const Navbar = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <MovieFilter sx={{ display: 'flex', mr: 1 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: 'block',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
            }}
          >
            <Link 
              style={{ color: 'inherit', textDecoration: 'inherit' }} 
              to="/" 
            >
              NONTON
            </Link>
          </Typography>
          <Box sx={{ display: 'block' }}>
            {navItems.map((item) => (
              <NavLink
                to={item.link}
                className={({ isActive }) => isActive ? 'nav-active' : 'nav-inactive'}
              >
                {item.text}
              </NavLink>
              
              // <Button key={item} sx={{ color: '#fff' }}>
              //   {item}
              // </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;





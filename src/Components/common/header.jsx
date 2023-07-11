import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


function Header() {
  return (
    <AppBar position="static" sx={{
      backgroundColor:"#4FC0D0"
    }}>
      <Container>
        <Toolbar sx={
          { justifyContent: 'center' }
        }>
          <Typography
            variant="h6"
            noWrap
            href="/"
            sx={{
              mr: 2,
              display: { md: 'flex' },
              textAlign: 'center',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              margin: 0
            }}
          >
            Monkey Hype
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
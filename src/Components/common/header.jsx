import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { Box, Button, ButtonGroup } from '@mui/material';



function Header() {
  const currentId = localStorage.getItem("user");
  
  const handleLogout = ()=>{
    localStorage.clear();
    window.location.reload();
  }
  return (
    <AppBar position="static" sx={{
      backgroundColor: "#4FC0D0",
      paddingBottom: "10px"
    }}>
      <Container>
        <Toolbar sx={
          { justifyContent: 'center' }
        }>
          <Typography
            variant="h4"
            noWrap
            href="/"
            sx={{
              mr: 2,
              display: { md: 'flex' },
              textAlign: 'center',
              fontFamily: 'cursive',
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
      <Box  sx={{ textAlign: "center" }}>

        {currentId == null ?
          <ButtonGroup variant="text" aria-label="text button group" >
            <Button href="/" sx={{ color: "white" }}>Home</Button>
            <Button href="/signup" sx={{ color: "white" }}>Signup</Button>
            <Button href="/login" sx={{ color: "white" }}>Login</Button>
          </ButtonGroup>
          :
          <ButtonGroup variant="text" aria-label="text button group" >
            <Button href="/" sx={{ color: "white" }}>Home</Button>
            <Button href="/game" sx={{ color: "white" }}>Typing test</Button>
            <Button href="/text" sx={{ color: "white" }}>My paragraph</Button>
            <Button onClick={handleLogout} sx={{ color: "white" }}>Logout</Button>
          </ButtonGroup>
        }
      </Box>
    </AppBar>
  );
}
export default Header;
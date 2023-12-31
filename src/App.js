import { Container } from '@mui/material';
import logo from './logo.svg';
import styled from '@emotion/styled';
import Header from './Components/common/Header';
import Footer from './Components/common/Footer';
import Game from './Components/common/Game';
import { Route, RouterProvider, Routes } from 'react-router-dom';
import routes from './Routes';

function App() {
  const AppDiv = styled.div`
  min-height:100vh;
  display:flex;
  flex-direction:column
  `
  return (
    <AppDiv>
        <Header />
        <RouterProvider router={routes} />
        <Footer />
    </AppDiv>
  );
}

//npx json-server --watch src\data\db.json --port 9999

export default App;

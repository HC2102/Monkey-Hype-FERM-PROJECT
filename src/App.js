import { Container } from '@mui/material';
import logo from './logo.svg';
import styled from '@emotion/styled';
import Header from './Components/common/header';
import Footer from './Components/common/footer';
import Main from './Components/common/body';

function App() {
  const AppDiv = styled.div`
  min-height:100vh;
  display:flex;
  flex-direction:column
  `
  return (
    <AppDiv>
      <Header />
      <Main />
      <Footer />
    </AppDiv>
  );
}

export default App;

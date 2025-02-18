import { Container } from '@chakra-ui/react';
import './App.css';
import IssuesBoard from './components/IssuesBoard';

function App() {
  return (
    <Container fluid py={8}>
      <IssuesBoard />
    </Container>
  );
}

export default App;

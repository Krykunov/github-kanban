import { Container } from '@chakra-ui/react';
import IssuesBoard from './components/IssuesBoard';
import './App.css';

function App() {
  return (
    <Container fluid py={8}>
      <IssuesBoard />
    </Container>
  );
}

export default App;

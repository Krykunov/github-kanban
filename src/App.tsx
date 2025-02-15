import { Container } from '@chakra-ui/react';
import InputForm from './components/InputForm';
import IssuesBoard from './components/IssuesBoard';
import './App.css';

function App() {
  return (
    <Container fluid py={8}>
      {/* <InputForm /> */}
      <IssuesBoard />
    </Container>
  );
}

export default App;

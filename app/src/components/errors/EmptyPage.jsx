import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import '../../static/css/emptyPageStyle.css';

export function EmptyPage({ isUserList }) {
  function setContainerContent() {
    if (isUserList) {
      return (
        <Container className="container d-flex-column align-items-center">
          <h6>Nie masz jeszcze żadnych tras.</h6>
          <div className="btn-box">
            <Button variant="outline-dark">Dodaj</Button>
            <Button variant="outline-dark">Szukaj</Button>
          </div>
        </Container>
      );
    }
    return <h6>Nie znaleziono wyników :(</h6>;
  }
  return (
    <Container className="container empty-page-container">
      {setContainerContent()}
    </Container>
  );
}

import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import { Link } from 'react-router-dom';
import '../../static/css/emptyPageStyle.css';

export function EmptyPage({ isUserList }) {
  function setContainerContent() {
    return (
      <Container>
        <div className="empty-header">
          <h1>
            {isUserList
              ? 'Nie masz jeszcze żadnych tras.'
              : 'Nie znaleziono wyników :('}
          </h1>
          {isUserList && (
            <div className="btn-box">
              <Link to="/new">
                <Button
                  variant="outline-dark"
                  className="btn-outline-dark btn-empty"
                >
                  Dodaj
                </Button>
              </Link>
              <Link to="/search">
                <Button
                  variant="outline-dark"
                  className="btn-outline-dark btn-empty"
                >
                  Szukaj
                </Button>
              </Link>
            </div>
          )}
        </div>
      </Container>
    );
  }
  return (
    <Container className="container empty-page-container">
      {setContainerContent()}
    </Container>
  );
}

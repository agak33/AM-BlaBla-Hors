import Container from 'react-bootstrap/esm/Container';
import '../../static/css/page404Style.css';

export function Page404() {
  return (
    <Container>
      <div className="not-found-container">
        <h1>Nie znaleziono takiej strony :(</h1>
      </div>
    </Container>
  );
}

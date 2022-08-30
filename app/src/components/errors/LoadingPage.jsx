import Container from 'react-bootstrap/esm/Container';
import Spinner from 'react-bootstrap/Spinner';
import '../../static/css/loadingPageStyle.css';

export function LoadingPage() {
  return (
    <Container className="conainer loading-page-container">
      <Spinner animation="border" variant="dark" />
      <span className="sr-only">Loading...</span>
    </Container>
  );
}

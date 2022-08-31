import { StatsSection } from './StatsSection';
import Container from 'react-bootstrap/Container';
import { useLandingContent } from '../hooks/useLandingContent';
import { LoadingPage } from '../errors/LoadingPage';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';

export function UserLandingPage() {
  const {
    isLoading,
    isValid,
    content: { first_name: firstName, organized },
  } = useLandingContent();

  if (isLoading) {
    return <LoadingPage />;
  }
  if (!isValid) {
    window.localStorage.removeItem(process.env.REACT_APP_TOKEN_NAME);
    window.location = '/login';
  }
  return (
    <Container>
      <div className="welcome-header">
        <h1>Witaj, {firstName}!</h1>
        <h6>Dokąd dzisiaj jedziesz? :)</h6>
        <div className="btn-box">
          <Link to="/new">
            <Button
              variant="outline-dark"
              className="btn-outline-dark btn-landing"
            >
              Dodaj trasę
            </Button>
          </Link>
          <Link to="search">
            <Button
              variant="outline-dark"
              className="btn-outline-dark btn-landing"
            >
              Szukaj trasy
            </Button>
          </Link>
        </div>
      </div>
      {/* {!isLoading && <StatsSection stats={{ organized }} />} */}
    </Container>
  );
}

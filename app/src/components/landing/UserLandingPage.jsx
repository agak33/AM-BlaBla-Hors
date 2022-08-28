import { StatsSection } from './StatsSection';
import Container from 'react-bootstrap/Container';
import { useLandingContent } from '../hooks/useLandingContent';
import { LoadingPage } from '../errors/LoadingPage';

export function UserLandingPage() {
  const {
    isLoading,
    isValid,
    content: { first_name: firstName, stats },
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
      <h2>Witaj, {firstName}!</h2>
      <StatsSection stats={stats} />
    </Container>
  );
}

import Container from 'react-bootstrap/esm/Container';
import Alert from 'react-bootstrap/Alert';
import { useLocation } from 'react-router-dom';
import { LoadingPage } from '../errors/LoadingPage';
import { useStatuses } from '../hooks/useStatuses';
import { StatusElement } from './StatusElement';
import { EmptyPage } from '../errors/EmptyPage';
import '../../static/css/statusListStyle.css';

export function StatusListPage() {
  const { isLoading, statuses } = useStatuses();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <Container>
      {statuses.length === 0 ? (
        <EmptyPage isUserList={true} />
      ) : (
        <>
          <h1>Lista tras, na które Cię zapisano</h1>
          {urlParams.get('success') != null &&
            (urlParams.get('success') === '1' ? (
              <Alert variant="success">
                Pomyślnie zapisano na podróż. Status będzie widoczny na liście.
              </Alert>
            ) : (
              <Alert variant="danger">
                Wystąpił błąd. Spróbuj ponownie później
              </Alert>
            ))}
          <div className="routes-container">
            {statuses.map((el) => {
              return (
                <StatusElement
                  key={el.id}
                  route={el.route}
                  date={el.date}
                  animalsNum={el.animals_num}
                  peopleNum={el.people_num}
                  status={el.status}
                  cost={el.cost}
                  contact={el.contact}
                />
              );
            })}
          </div>
        </>
      )}
    </Container>
  );
}

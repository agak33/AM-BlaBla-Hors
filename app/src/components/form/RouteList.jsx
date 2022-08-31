import { RouteElement } from './RouteElement';
import Container from 'react-bootstrap/esm/Container';
import Alert from 'react-bootstrap/Alert';
import { useLocation } from 'react-router-dom';
import { EmptyPage } from '../errors/EmptyPage';
import { LoadingPage } from '../errors/LoadingPage';
import { useRoutes } from '../hooks/useRoutes';
import '../../static/css/routeListStyle.css';

export function RouteList({ isUserList }) {
  const location = useLocation();
  const { isLoading, routes } = useRoutes(location.search, isUserList);
  const urlParams = new URLSearchParams(location.search);

  const [animalsNum, peopleNum] = [
    urlParams.get('animalsNum'),
    urlParams.get('peopleNum'),
  ];
  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <Container>
      {routes.length === 0 ? (
        <EmptyPage isUserList={isUserList} />
      ) : (
        <>
          <h1>
            {isUserList
              ? 'Twoje trasy'
              : `Znaleziono ${routes.length} tras${
                  routes.length === 1
                    ? 'ę'
                    : routes.length >= 2 && routes.length <= 4
                    ? 'y'
                    : ''
                }`}
          </h1>
          {urlParams.get('success') != null &&
            (urlParams.get('success') === '1' ? (
              <Alert variant="success">Dodano trasę do listy.</Alert>
            ) : (
              <Alert variant="danger">
                Wystąpił błąd. Spróbuj ponownie później
              </Alert>
            ))}
          <div className="routes-container">
            {routes.map((el) => {
              return (
                <RouteElement
                  key={el.uuid}
                  uuid={el.uuid}
                  date={el.date}
                  start={el.start}
                  destination={el.destination}
                  animalsNum={isUserList ? el.animals_num : animalsNum}
                  animalsFreeNum={el.free_animals_num}
                  peopleFreeNum={el.free_people_num}
                  peopleNum={isUserList ? el.people_num : peopleNum}
                  pricePerAnimal={el.animals_price}
                  pricePerPerson={el.person_price}
                  pendingRequests={el.pending_requests}
                  approvedRequests={el.approved_requests}
                  isSearchElement={!isUserList}
                />
              );
            })}
          </div>
        </>
      )}
    </Container>
  );
}

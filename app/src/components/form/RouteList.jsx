import { RouteElement } from './RouteElement';
import Container from 'react-bootstrap/esm/Container';
import { EmptyPage } from '../errors/EmptyPage';
import { LoadingPage } from '../errors/LoadingPage';
import { useRoutes } from '../hooks/useRoutes';

export function RouteList({ isUserList }) {
  const { isLoading, routes } = useRoutes({}, isUserList);

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <Container className="d-flex flex-wrap">
      {routes.length === 0 ? (
        <EmptyPage isUserList={isUserList} />
      ) : (
        routes.map((el) => (
          <RouteElement
            key={el.id}
            start={el.start}
            destination={el.destination}
            animalsNum={el.animals}
            peopleNum={el.people}
            pricePerAnimal={el.pricePerAnimal}
            pricePerPerson={el.pricePerPerson}
            currency={el.currency}
          />
        ))
      )}
    </Container>
  );
}

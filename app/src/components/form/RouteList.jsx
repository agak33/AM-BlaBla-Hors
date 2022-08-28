import { useEffect, useState } from 'react';
import { RouteElement } from './RouteElement';
import Container from 'react-bootstrap/esm/Container';
import { EmptyPage } from '../errors/EmptyPage';
import { useUserSettings } from '../hooks/useUserSettings';

export function RouteList() {
  const [allRoutes, setAllRoutes] = useState([]);

  useEffect(() => {
    const data = require('../../mockData/routesList.json');
    setAllRoutes(data);
  }, []);

  return (
    <Container className="d-flex flex-wrap">
      {allRoutes.length === 0 ? (
        <EmptyPage />
      ) : (
        allRoutes.map((el) => (
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

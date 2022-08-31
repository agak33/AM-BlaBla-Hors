import '../../static/css/routeElement.css';
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import { useState } from 'react';
import { signUpForRoute } from '../utils';

export function RouteElement({
  uuid,
  date,
  start,
  destination,
  animalsNum,
  peopleNum,
  pricePerAnimal,
  pricePerPerson,
  animalsFreeNum,
  peopleFreeNum,
  pendingRequests,
  approvedRequests,
  isSearchElement,
}) {
  const [visibleRequest, setVisibleRequest] = useState(false);
  const navigate = useNavigate();

  async function handleChoosing() {
    await signUpForRoute(uuid, animalsNum, peopleNum).then((statusCode) => {
      navigate({
        pathname: '/status',
        search: `?success=${statusCode === 201 ? 1 : 0}`,
      });
    });
  }

  function setButtonElement() {
    if (isSearchElement) {
      return (
        <>
          <Button
            onClick={() => setVisibleRequest(!visibleRequest)}
            variant="outline-dark"
          >
            Wybieram
          </Button>
          <Accordion.Collapse in={visibleRequest}>
            <Card.Body>
              <p>Czy potwierdzasz swój wybór?</p>
              <Button variant="success" onClick={handleChoosing}>
                Tak, zapisz mnie
              </Button>
            </Card.Body>
          </Accordion.Collapse>
        </>
      );
    }
    return (
      <>
        {/* <Link to={`./${uuid}`}>
          <Button variant="dark">Edytuj</Button>
        </Link> */}
        <Button
          onClick={() => navigate(`./${uuid}`)}
          variant="success"
          disabled={!pendingRequests && !approvedRequests}
        >
          Zobacz wszystkie zgłoszenia
        </Button>
      </>
    );
  }

  function setPricingElement() {
    if (isSearchElement) {
      return (
        <ListGroup.Item>
          <div>
            Za ile:{' '}
            {(animalsNum * pricePerAnimal + peopleNum * pricePerPerson).toFixed(
              2
            )}{' '}
            PLN
          </div>
          <div style={{ fontWeight: 'bold', padding: '10px 0 5px 0' }}>
            W tym:{' '}
          </div>
          <ul>
            <li>{(animalsNum * pricePerAnimal).toFixed(2)} PLN za konie</li>
            <li>{(peopleNum * pricePerPerson).toFixed(2)} PLN za osoby</li>
          </ul>
        </ListGroup.Item>
      );
    }
    return (
      <>
        <ListGroup.Item>
          <div>Ilość miejsc dla koni: {animalsNum}</div>
          <div>w tym wolne: {animalsFreeNum}</div>
          <div>Cena za 1 konia: {`${pricePerAnimal.toFixed(2)}\u00A0PLN`}</div>
        </ListGroup.Item>

        <ListGroup.Item>
          <div>Ilość miejsc dla osób: {peopleNum}</div>
          <div>w tym wolne: {peopleFreeNum}</div>
          <div>Cena za 1 osobę: {`${pricePerPerson.toFixed(2)}\u00A0PLN`}</div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div>Zgłoszenia do zatwierdzenia: {pendingRequests}</div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div>Zatwierdzone zgłoszenia: {approvedRequests}</div>
        </ListGroup.Item>
      </>
    );
  }

  return (
    <Card className="card route-card">
      <Card.Body>
        <Card.Title>
          z {start} do {destination}
        </Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>
            Kiedy:{' '}
            {new Date(date).toLocaleDateString(undefined, {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </ListGroup.Item>
          {setPricingElement()}
        </ListGroup>
      </Card.Body>
      {setButtonElement()}
    </Card>
  );
}

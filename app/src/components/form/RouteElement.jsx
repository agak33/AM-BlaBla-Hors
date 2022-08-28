import '../../static/css/routeElement.css';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export function RouteElement({
  start,
  destination,
  animalsNum,
  peopleNum,
  pricePerAnimal,
  pricePerPerson,
  currency,
}) {
  function handleOnClick() {}

  return (
    <Card onClick={handleOnClick}>
      <Card.Body>
        <Card.Title>
          {start} - {destination}
        </Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>
            Animals: {animalsNum}, {pricePerAnimal} {currency}
          </ListGroup.Item>
          <ListGroup.Item>
            People: {peopleNum}, {pricePerPerson} {currency}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

RouteElement.propTypes = {
  start: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  animalsNum: PropTypes.number.isRequired,
  peopleNum: PropTypes.number.isRequired,
  pricePerAnimal: PropTypes.number.isRequired,
  pricePerPerson: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
};

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export function StatusElement({
  route,
  date,
  animalsNum,
  peopleNum,
  status,
  contact,
  cost,
}) {
  function setStatus() {
    if (status === 'APPROVED') {
      return (
        <span style={{ color: 'green', fontWeight: 'bold' }}>
          ZAAKCEPTOWANO
        </span>
      );
    }
    return <span style={{ color: 'red', fontWeight: 'bold' }}>OCZEKUJĄCE</span>;
  }

  return (
    <Card className="card route-card">
      <Card.Body>
        <Card.Title>{route}</Card.Title>
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
          <ListGroup.Item>Ilość koni: {animalsNum}</ListGroup.Item>
          <ListGroup.Item>Ilość osób: {peopleNum}</ListGroup.Item>
          <ListGroup.Item>Status: {setStatus()}</ListGroup.Item>
          <ListGroup.Item>
            Całkowity koszt: {cost.toFixed(2)} PLN
          </ListGroup.Item>
          <ListGroup.Item>Kontakt: {contact}</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

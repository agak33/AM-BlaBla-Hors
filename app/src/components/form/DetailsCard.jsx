import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import ListGroup from 'react-bootstrap/ListGroup';

export function DetailCard({
  id,
  animalsNum,
  peopleNum,
  status,
  contact,
  handleApprove,
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
    <Card className="card details-card">
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>Liczba koni: {animalsNum}</ListGroup.Item>
          <ListGroup.Item>Liczba osób: {peopleNum}</ListGroup.Item>
          <ListGroup.Item>Status: {setStatus()}</ListGroup.Item>
          <ListGroup.Item>Kontakt: {contact}</ListGroup.Item>
        </ListGroup>
      </Card.Body>
      {status === 'PENDING' && (
        <Button variant="success" onClick={() => handleApprove(id)}>
          Zatwierdź
        </Button>
      )}
    </Card>
  );
}

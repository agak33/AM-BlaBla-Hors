import { useParams } from 'react-router-dom';
import { useRouteDetails } from '../hooks/useRouteDetails';
import { LoadingPage } from '../errors/LoadingPage';
import { Page404 } from '../errors/Page404';
import Container from 'react-bootstrap/esm/Container';
import axios from 'axios';
import { DetailCard } from './DetailsCard';
import '../../static/css/routeDetailsStyle.css';

export function RouteDetails() {
  const { slug } = useParams();
  const {
    isLoading,
    isValid,
    route: { name, requests },
  } = useRouteDetails(slug);
  async function approve(id) {
    await axios
      .patch(
        `${process.env.REACT_APP_API_URL}/route/passenger/`,
        {
          id,
        },
        {
          headers: {
            Authorization: `Token ${JSON.parse(
              window.localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
            )}`,
          },
        }
      )
      .then((response) => {
        window.location = `${window.location.pathname}?status=1`;
      })
      .catch((err) => {
        window.location = `${window.location.pathname}?status=0`;
      });
  }

  if (isLoading) {
    return <LoadingPage />;
  }
  if (!isValid) {
    return <Page404 />;
  }
  return (
    <Container>
      <div className="header-details">
        <h1>Zgłoszenia dla Twojej trasy</h1>
        <h6>{name}</h6>
      </div>
      <div className="details-container">
        {requests.map((el) => {
          return (
            <DetailCard
              key={el.id}
              id={el.id}
              animalsNum={el.animals_num}
              peopleNum={el.people_num}
              status={el.status}
              contact={el.passenger_contact}
              handleApprove={approve}
            />
          );
        })}
      </div>
    </Container>
  );
}

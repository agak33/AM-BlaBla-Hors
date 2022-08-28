import Container from 'react-bootstrap/Container';
import { aboutAppSectionData as data } from '../../pageContent/pl';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { AnimatedCar } from '../animations/AnimatedCar';

export function AboutAppSection() {
  return (
    <Container>
      <h1>{data.title}</h1>
      <div className="about-section">
        <div className="about-content">
          <h5>{data.aboutSectionTitle}</h5>
          <p>{data.aboutSectionText}</p>
        </div>
        <AnimatedCar />
      </div>
      <div className="why-section">
        <img
          src={require('../../static/images/horse.png')}
          alt="horse"
          id="horse-img"
        />
        <div className="why-content">
          <h5>{data.whySectionTitle}</h5>
          <p>{data.whySectionText}</p>
        </div>
      </div>
      <div className="login-section">
        <h2>{data.loginSectionTitle}</h2>
        <p>{data.loginSectionText}</p>
        <Link to="/login">
          <Button variant="dark" className="btn-dark btn-landing">
            {data.loginButtonText}
          </Button>
        </Link>

        <Link to="/register">
          <Button variant="dark" className="btn-dark btn-landing">
            {data.registerButtonText}
          </Button>
        </Link>
      </div>
    </Container>
  );
}

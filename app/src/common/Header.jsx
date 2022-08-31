import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { destroySessionToken } from '../components/utils';
import { headerData as data } from '../pageContent/pl';
import { useState } from 'react';

export function Header({ isValid }) {
  const [open, setOpen] = useState(false);

  function logOut() {
    destroySessionToken(
      JSON.parse(window.localStorage.getItem(process.env.REACT_APP_TOKEN_NAME))
    ).then((_) => {
      // const { statusCode, errorMessage } = response;
      window.localStorage.removeItem(process.env.REACT_APP_TOKEN_NAME);
      window.location = '/';
    });
  }

  function setAuthorizedOptions() {
    if (isValid) {
      return (
        <>
          <Link to="/new" className="nav-link">
            {data.newRouteLink}
          </Link>
          <Link to="/search" className="nav-link">
            {data.searchRoutesLink}
          </Link>
          <Link to="/myroutes" className="nav-link">
            {data.yourListLink}
          </Link>
          <Link to="/status" className="nav-link">
            {data.statusListLink}
          </Link>
        </>
      );
    }
    return <></>;
  }

  function setLoginOptions() {
    if (isValid) {
      return (
        <>
          <Button variant="outline-secondary" onClick={logOut}>
            {data.logoutLink}
          </Button>
        </>
      );
    }
    return (
      <>
        <Link to="/login" className="nav-link">
          {data.loginLink}
        </Link>
        <Link to="/register" className="nav-link">
          {data.registerLink}
        </Link>
      </>
    );
  }
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      {/* <Navbar bg="dark" variant="dark"> */}
      <Container>
        <Link to="/" className="navbar-brand" onClick={() => setOpen(false)}>
          BlaBla Hors
        </Link>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setOpen(!open)}
        />
        <Navbar.Collapse
          id="basic-navbar-nav"
          in={open}
          onClick={() => setOpen(false)}
        >
          <Nav className="me-auto">{setAuthorizedOptions()}</Nav>
          <Nav>{setLoginOptions()}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

Header.propTypes = {
  isValid: PropTypes.bool.isRequired,
};

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../static/css/authorizationPageStyle.css';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { extractData, fetchSessionToken } from '../utils';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import {
  loginPageData as loginData,
  registerPageData as registerData,
  authPageErrors as pageErrors,
} from '../../pageContent/pl';

export function AuthorizationPage({ isLoginPage }) {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
  }, [isLoginPage]);

  const pageFields = {
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    password: 'password',
  };

  const regex = {
    name: /[A-Za-z\-]/,
    email: /^[a-zA-Z0-9.+\-_]+@[a-zA-Z0-9.+\-_]+\.[a-zA-Z]+$/,
  };

  function isFormValid(formData) {
    let currErrors = {};
    const [firstName, lastName, email, password] = [
      formData[pageFields.firstName],
      formData[pageFields.lastName],
      formData[pageFields.email],
      formData[pageFields.password],
    ];

    if (!isLoginPage) {
      if (firstName === '' || !firstName.match(regex.name)) {
        currErrors.firstName = pageErrors.firstNameInvalid;
      } else if (firstName.length > 50) {
        currErrors.firstName = pageErrors.firstNameTooLong;
      }

      if (lastName === '' || !lastName.match(regex.name)) {
        currErrors.lastName = pageErrors.lastNameInvalid;
      } else if (lastName.length > 50) {
        currErrors.lastName = pageErrors.lastNameTooLong;
      }
    }

    if (email === '' || !email.match(regex.email)) {
      currErrors.email = pageErrors.emailInvalid;
    } else if (email.length > 150) {
      currErrors.email = pageErrors.emailTooLong;
    }

    if (password === '') {
      currErrors.password = pageErrors.passwordInvalid;
    } else if (password.length > 150) {
      currErrors.password = pageErrors.passwordTooLong;
    } else if (password.length < 8 && !isLoginPage) {
      currErrors.password = pageErrors.passwordTooShort;
    }

    setErrors(currErrors);
    return Object.keys(currErrors).length === 0;
  }

  function handleSubmitButton(event) {
    setErrors({})
    event.preventDefault();
    const formData = extractData(event.target.form || {}, pageFields);

    if (isFormValid(formData)) {
      fetchSessionToken(formData, isLoginPage).then((response) => {
        const { statusCode, token } = response;
        let errorMessage = undefined;

        if (statusCode === 201) {
          window.localStorage.setItem(
            process.env.REACT_APP_TOKEN_NAME,
            JSON.stringify(token)
          );
          window.location = '/';
        } else if(statusCode === 401) {
          errorMessage = pageErrors.code401Login

        } else if(statusCode === 403) {
          errorMessage = pageErrors.code403Register;
        } else {
          errorMessage = isLoginPage ? pageErrors.otherErrorsLogin : pageErrors.otherErrorsRegister
        }

        setErrors({
          errorMessage
        })
      });
    } else {
    }
    event.stopPropagation();
  }

  return (
    <>
      <Container className="container container-flex">
        <div className="auth-section">
          <h3>{isLoginPage ? loginData.title : registerData.title}</h3>
          <Form className="form auth-form">
            {errors.errorMessage && (
              <Alert variant="danger">{errors.errorMessage}</Alert>
            )}
            {isLoginPage ? (
              <LoginForm
                fields={pageFields}
                errors={errors}
                emailLabel={loginData.emailLabel}
                passwordLabel={loginData.passwordLabel}
              />
            ) : (
              <RegisterForm
                fields={pageFields}
                errors={errors}
                firstNameLabel={registerData.firstNameLabel}
                lastNameLabel={registerData.lastNameLabel}
                emailLabel={registerData.emailLabel}
                passwordLabel={registerData.passwordLabel}
              />
            )}
            <Button
              type="submit"
              variant="dark"
              className="btn-dark btn-auth"
              onClick={handleSubmitButton}
            >
              {isLoginPage ? loginData.submitButton : registerData.submitButton}
            </Button>
          </Form>
        </div>

        <div className="img-link-container">
          <img
            src={require('../../static/images/cart.png')}
            id="auth-img"
            alt="cart"
          />
          {isLoginPage ? (
            <Link to="/register" className="register-link">
              <Button variant="outline-dark btn-auth">
                {loginData.registerLink}
              </Button>
            </Link>
          ) : (
            <></>
          )}
        </div>
      </Container>
    </>
  );
}

AuthorizationPage.propTypes = {
  isLoginPage: PropTypes.bool.isRequired,
};

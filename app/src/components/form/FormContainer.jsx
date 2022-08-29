import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/esm/Container';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { extractData, fetchRoutes } from '../utils';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import { useCurrencies } from '../hooks/useCurrencies';
import '../../static/css/formRouteStyle.css';

export function FormContainer({ isSearchForm }) {
  const { isLoading, currencies } = useCurrencies();
  const [errors, setErrors] = useState({});
  const fieldIds = {
    start: 'start',
    destination: 'destination',
    date: 'date',
    minDate: 'minDate',
    maxDate: 'maxDate',
    currency: 'currency',
    animalsNum: 'animalsNum',
    animalsPrice: 'animalsPrice',
    peopleNum: 'peopleNum',
    peoplePrice: 'peoplePrice',
  };

  function isFormValid(formData) {
    let currErrors = {};

    setErrors(currErrors);
    return Object.keys(currErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = extractData(event.target.form || {}, fieldIds);

    if(isFormValid(formData)) {
      if(isSearchForm) {
        fetchRoutes(formData).then(response => {
          const { statusCode, routes } = response;

          if(statusCode === 200) {
            <Navigate to={{
              pathname: '/routes'
            }} />
          }
        })
      }
    }
  }

  return (
    <Container className="container route-container">
      <h3>{isSearchForm ? 'Wyszukaj trasę' : 'Dodaj trasę'}</h3>
      <Form className="form route-form">
        <FloatingLabel label="Start Location">
          <Form.Control
            type="text"
            id={`${fieldIds.start}`}
            isInvalid={errors.start}
          />
          <Form.Control.Feedback type="invalid">
            {errors.start}
          </Form.Control.Feedback>
        </FloatingLabel>
{/*
        {!isSearchForm && <LocationList />} */}

        <FloatingLabel label="Destination Location">
          <Form.Control
            type="text"
            id={`${fieldIds.destination}`}
            isInvalid={errors.destination}
          />
          <Form.Control.Feedback type="invalid">
            {errors.destination}
          </Form.Control.Feedback>
        </FloatingLabel>

        {isSearchForm ? (
          <>
            <FloatingLabel label="Min Date">
              <Form.Control
                type="date"
                id={`${fieldIds.minDate}`}
                isInvalid={errors.minDate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.minDate}
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel label="Max Date">
              <Form.Control
                type="date"
                id={`${fieldIds.maxDate}`}
                isInvalid={errors.maxDate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.maxDate}
              </Form.Control.Feedback>
            </FloatingLabel>
          </>
        ) : (
          <FloatingLabel label="Date">
            <Form.Control
              type="date"
              id={`${fieldIds.date}`}
              isInvalid={errors.date}
            />
            <Form.Control.Feedback type="invalid">
              {errors.date}
            </Form.Control.Feedback>
          </FloatingLabel>
        )}

        <FloatingLabel label="Currency">
          {isLoading ? (
            <Form.Select>
              <option>Loading...</option>
            </Form.Select>
          ) : (
            <Form.Select id={`${fieldIds.currency}`}>
              {currencies.map((curr) => {
                return <option key={curr}>{curr}</option>;
              })}
            </Form.Select>
          )}
        </FloatingLabel>

        <FloatingLabel label="Animals Num">
          <Form.Control
            type="number"
            id={`${fieldIds.animalsNum}`}
            isInvalid={errors.animalsNum}
          />
          <Form.Control.Feedback type="invalid">
            {errors.animalsNum}
          </Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel label={isSearchForm ? 'Max Price' : 'Price'}>
          <Form.Control
            type="number"
            id={`${fieldIds.animalsPrice}`}
            isInvalid={errors.animalsPrice}
          />
          <Form.Control.Feedback type="invalid">
            {errors.animalsPrice}
          </Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel label="People Num">
          <Form.Control
            type="number"
            id={`${fieldIds.peopleNum}`}
            isInvalid={errors.peopleNum}
          />
          <Form.Control.Feedback type="invalid">
            {errors.peopleNum}
          </Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel label={isSearchForm ? 'Max Price' : 'Price'}>
          <Form.Control
            type="number"
            id={`${fieldIds.peoplePrice}`}
            isInvalid={errors.peoplePrice}
          />
          <Form.Control.Feedback type="invalid">
            {errors.peoplePrice}
          </Form.Control.Feedback>
        </FloatingLabel>
        <Button onClick={handleSubmit} variant="dark">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

FormContainer.propTypes = {
  isSearchForm: PropTypes.bool.isRequired,
};

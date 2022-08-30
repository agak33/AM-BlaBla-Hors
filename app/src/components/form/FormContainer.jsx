import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/esm/Container';
import { useState } from 'react';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
// import { useCurrencies } from '../hooks/useCurrencies';
import '../../static/css/formRouteStyle.css';
import { useRef } from 'react';
import { postNewRoute } from '../utils';

export function FormContainer({ isSearchForm }) {
  // const { isLoading, currencies } = useCurrencies();
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
  const startRef = useRef();
  const [startVal, setStartVal] = useState('');

  const destinationRef = useRef();
  const [destinationVal, setDestinationVal] = useState('');

  const dateRef = useRef();
  const [dateVal, setDateVal] = useState(() => {
    const today = new Date(Date.now());
    const year = ('0000' + today.getFullYear()).slice(-4);
    const month = ('00' + today.getMonth()).slice(-2);
    const day = ('00' + today.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  });

  const animalsNumRef = useRef();
  const [animalsNumVal, setAnimalsuNum] = useState(1);

  const animalsPriceRef = useRef();
  const [animalsPriceVal, setAnimalsPriceVal] = useState(0);

  const peopleNumRef = useRef();
  const [peopleNumVal, setPeopleNumVal] = useState(0);

  const peoplePriceRef = useRef();
  const [peoplePriceVal, setPeoplePriceVal] = useState(0);

  function handleChange(event) {
    const elementId = event.target.id;
    if (elementId === fieldIds.start && startRef.current.value.length < 100) {
      setStartVal(startRef.current.value.toUpperCase());
    } else if (
      elementId === fieldIds.destination &&
      (destinationVal.length < 100 ||
        destinationRef.current.value.length < destinationVal.length)
    ) {
      setDestinationVal(destinationRef.current.value.toUpperCase());
    } else if (elementId === fieldIds.date) {
      setDateVal(dateRef.current.value);
    } else if (
      elementId === fieldIds.animalsNum &&
      animalsNumRef.current.value > 0 &&
      animalsNumRef.current.value <= 50
    ) {
      setAnimalsuNum(Number.parseInt(animalsNumRef.current.value));
    } else if (
      elementId === fieldIds.animalsPrice &&
      animalsPriceRef.current.value >= 0
    ) {
      setAnimalsPriceVal(Math.round(animalsPriceRef.current.value * 100) / 100);
    } else if (
      elementId === fieldIds.peopleNum &&
      peopleNumRef.current.value >= 0 &&
      peopleNumRef.current.value <= 50
    ) {
      setPeopleNumVal(Number.parseInt(peopleNumRef.current.value));
    } else if (
      elementId === fieldIds.peoplePrice &&
      peoplePriceRef.current.value >= 0
    ) {
      setPeoplePriceVal(Math.round(peoplePriceRef.current.value * 100) / 100);
    }
  }

  function isFormValid() {
    let currErrors = {};
    setErrors(currErrors);
    return Object.keys(currErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (isFormValid()) {
      if (isSearchForm) {
        window.location = '/routes';
      } else {
        const dataToSend = {
          date: dateVal,
          locations: [startVal, destinationVal],
          animals_num: animalsNumVal,
          people_num: peopleNumVal,
          animals_price: animalsPriceVal,
          person_price: peoplePriceVal,
        };
        postNewRoute(dataToSend).then((response) => {
          if (response === 201) {
            window.location = '/myroutes';
          }
        });
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
            ref={startRef}
            value={startVal}
            onChange={handleChange}
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
            ref={destinationRef}
            value={destinationVal}
            onChange={handleChange}
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
              ref={dateRef}
              value={dateVal}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              {errors.date}
            </Form.Control.Feedback>
          </FloatingLabel>
        )}

        {/* <FloatingLabel label="Currency">
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
        </FloatingLabel> */}

        <FloatingLabel label="Animals Num">
          <Form.Control
            type="number"
            id={`${fieldIds.animalsNum}`}
            isInvalid={errors.animalsNum}
            ref={animalsNumRef}
            value={animalsNumVal}
            onChange={handleChange}
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
            ref={animalsPriceRef}
            value={animalsPriceVal}
            onChange={handleChange}
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
            ref={peopleNumRef}
            value={peopleNumVal}
            onChange={handleChange}
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
            ref={peoplePriceRef}
            value={peoplePriceVal}
            onChange={handleChange}
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

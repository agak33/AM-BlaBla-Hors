import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/esm/Container';
import { useState } from 'react';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
// import { useCurrencies } from '../hooks/useCurrencies';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../static/css/formRouteStyle.css';
import { useRef } from 'react';
import { postNewRoute } from '../utils';
import { useEffect } from 'react';

export function FormContainer({ isSearchForm }) {
  // const { isLoading, currencies } = useCurrencies();
  const location = useLocation();
  const navigate = useNavigate();
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
    const month = ('00' + (today.getMonth() + 1)).slice(-2);
    const day = ('00' + today.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  });

  const minDateRef = useRef();
  const [minDateVal, setMinDateVal] = useState(dateVal);

  const maxDateRef = useRef();
  const [maxDateVal, setMaxDateVal] = useState(dateVal);

  const animalsNumRef = useRef();
  const [animalsNumVal, setAnimalsuNum] = useState('');

  const animalsPriceRef = useRef();
  const [animalsPriceVal, setAnimalsPriceVal] = useState('');

  const peopleNumRef = useRef();
  const [peopleNumVal, setPeopleNumVal] = useState('');

  const peoplePriceRef = useRef();
  const [peoplePriceVal, setPeoplePriceVal] = useState('');

  const integerPattern = /^[0-9]*$/;
  const pricePattern = /^[0-9]*[,.]?[0-9]{0,2}$/;

  useEffect(() => {
    setStartVal('');
    setDestinationVal('');
    setDateVal(() => {
      const today = new Date(Date.now());
      const year = ('0000' + today.getFullYear()).slice(-4);
      const month = ('00' + (today.getMonth() + 1)).slice(-2);
      const day = ('00' + today.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    });
    setMinDateVal(dateVal);
    setMaxDateVal(dateVal);
    setAnimalsuNum('');
    setAnimalsPriceVal('');
    setPeopleNumVal('');
    setPeoplePriceVal('');
    setErrors({});
  }, [location.pathname]);

  function handleChange(event) {
    const elementId = event.target.id;
    if (
      elementId === fieldIds.start &&
      startRef.current.value.indexOf(',') === -1
    ) {
      setStartVal(startRef.current.value.toUpperCase());
      if (startRef.current.value.length <= 100) {
        setErrors({ ...errors, [fieldIds.start]: '' });
      } else {
        setErrors({
          ...errors,
          [fieldIds.start]:
            'Nazwa miejscowości nie może być dłuższa niż 100 znaków.',
        });
      }
    } else if (
      elementId === fieldIds.destination &&
      destinationRef.current.value.indexOf(',') === -1
    ) {
      setDestinationVal(destinationRef.current.value.toUpperCase());
      if (destinationRef.current.value.length <= 100) {
        setErrors({ ...errors, [fieldIds.destination]: '' });
      } else {
        setErrors({
          ...errors,
          [fieldIds.destination]:
            'Nazwa miejscowości nie może być dłuższa niż 100 znaków.',
        });
      }
    } else if (elementId === fieldIds.date) {
      setDateVal(dateRef.current.value);
      if (dateRef.current.value) {
        const chosenDate = new Date(dateRef.current.value).setHours(0, 0, 0, 0);
        const currentDate = new Date(Date.now()).setHours(0, 0, 0, 0);
        if (chosenDate < currentDate) {
          setErrors({
            ...errors,
            [fieldIds.date]: 'Data nie może być przeszła',
          });
        } else {
          setErrors({ ...errors, [fieldIds.date]: '' });
        }
      }
    } else if (elementId === fieldIds.minDate) {
      setMinDateVal(minDateRef.current.value);
      if (minDateRef.current.value) {
        const chosen = new Date(minDateRef.current.value).setHours(0, 0, 0, 0);
        const currentDate = new Date(Date.now()).setHours(0, 0, 0, 0);
        if (chosen < currentDate) {
          setErrors({
            ...errors,
            [fieldIds.minDate]: 'Data nie może być przeszła',
          });
        } else {
          setErrors({ ...errors, [fieldIds.minDate]: '' });
        }
      }
    } else if (elementId === fieldIds.maxDate) {
      setMaxDateVal(maxDateRef.current.value);
      if (maxDateRef.current.value) {
        const chosen = new Date(maxDateRef.current.value).setHours(0, 0, 0, 0);
        const currentDate = new Date(Date.now()).setHours(0, 0, 0, 0);
        if (chosen < currentDate) {
          setErrors({
            ...errors,
            [fieldIds.maxDate]: 'Data nie może być przeszła',
          });
        } else {
          setErrors({ ...errors, [fieldIds.maxDate]: '' });
        }
      }
    } else if (
      elementId === fieldIds.animalsNum &&
      animalsNumRef.current.value.match(integerPattern)
    ) {
      setAnimalsuNum(animalsNumRef.current.value);
      if (animalsNumRef.current.value < 1 || animalsNumRef.current.value > 50) {
        setErrors({
          ...errors,
          [fieldIds.animalsNum]: 'Liczba koni powinna wynosić między 1 a 50.',
        });
      } else {
        setErrors({ ...errors, [fieldIds.animalsNum]: '' });
      }
    } else if (
      elementId === fieldIds.animalsPrice &&
      animalsPriceRef.current.value.match(pricePattern)
    ) {
      setAnimalsPriceVal(animalsPriceRef.current.value);
      if (animalsPriceRef.current.value.replace(',', '.') > 2000000) {
        setErrors({
          ...errors,
          [fieldIds.animalsPrice]:
            'Podaj liczbę z przedziału od 0 do 2 000 000',
        });
      } else {
        setErrors({ ...errors, [fieldIds.animalsPrice]: '' });
      }
    } else if (
      elementId === fieldIds.peopleNum &&
      peopleNumRef.current.value.match(integerPattern)
    ) {
      setPeopleNumVal(peopleNumRef.current.value);
      if (peopleNumRef.current.value > 50) {
        setErrors({
          ...errors,
          [fieldIds.peopleNum]: 'Liczba osób powinna wynosić między 0 a 50.',
        });
      } else {
        setErrors({ ...errors, [fieldIds.peopleNum]: '' });
      }
    } else if (
      elementId === fieldIds.peoplePrice &&
      peoplePriceRef.current.value.match(pricePattern)
    ) {
      setPeoplePriceVal(peoplePriceRef.current.value);
      if (peoplePriceRef.current.value.replace(',', '.') > 2000000) {
        setErrors({
          ...errors,
          [fieldIds.peoplePrice]: 'Podaj liczbę z przedziału od 0 do 2 000 000',
        });
      } else {
        setErrors({ ...errors, [fieldIds.peoplePrice]: '' });
      }
    }
  }

  function isFormValid() {
    let currErrors = {};
    const keys = isSearchForm
      ? [
          [fieldIds.start, startVal],
          [fieldIds.destination, destinationVal],
          [fieldIds.minDate, minDateVal],
          [fieldIds.maxDate, maxDateVal],
          [fieldIds.animalsNum, animalsNumVal],
          [fieldIds.animalsPrice, animalsPriceVal],
          [fieldIds.peopleNum, peopleNumVal],
          [fieldIds.peoplePrice, peoplePriceVal],
        ]
      : [
          [fieldIds.start, startVal],
          [fieldIds.destination, destinationVal],
          [fieldIds.date, dateVal],
          [fieldIds.animalsNum, animalsNumVal],
          [fieldIds.animalsPrice, animalsPriceVal],
          [fieldIds.peopleNum, peopleNumVal],
          [fieldIds.peoplePrice, peoplePriceVal],
        ];
    keys.forEach(([key, val]) => {
      if (!val) {
        currErrors[key] = 'Pole nie może być puste';
      }
    });

    if (
      startVal !== '' &&
      destinationVal !== '' &&
      startVal === destinationVal
    ) {
      currErrors[fieldIds.start] = 'Nazwy miejscowości muszą być różne.';
      currErrors[fieldIds.destination] = 'Nazwy miejscowości muszą być różne.';
    }

    if (minDateVal && maxDateVal) {
      const minDate = new Date(minDateVal).setHours(0, 0, 0, 0);
      const maxDate = new Date(maxDateVal).setHours(0, 0, 0, 0);
      if (minDate > maxDate) {
        currErrors[fieldIds.minDate] =
          'Data nie może być późniejsza od poniższej.';
        currErrors[fieldIds.maxDate] =
          'Data nie może być wcześniejsza od poprzedniej.';
      }
    }

    setErrors(currErrors);
    return Object.keys(currErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (isFormValid()) {
      if (isSearchForm) {
        const keys = [
          [fieldIds.start, startVal],
          [fieldIds.destination, destinationVal],
          [fieldIds.minDate, minDateVal],
          [fieldIds.maxDate, maxDateVal],
          [fieldIds.animalsNum, animalsNumVal],
          [fieldIds.animalsPrice, animalsPriceVal],
          [fieldIds.peopleNum, peopleNumVal],
          [fieldIds.peoplePrice, peoplePriceVal],
        ];
        navigate({
          pathname: '/routes',
          search: `?${keys.map(([key, val]) => `${key}=${val}`).join('&')}`,
        });
      } else {
        const dataToSend = {
          date: dateVal,
          start: startVal,
          destination: destinationVal,
          animals_num: animalsNumVal,
          people_num: peopleNumVal,
          animals_price: animalsPriceVal.replace(',', '.'),
          person_price: peoplePriceVal.replace(',', '.'),
        };
        postNewRoute(dataToSend).then((response) => {
          window.location = `/myroutes?success=${
            response.statusCode === 201 ? 1 : 0
          }`;
        });
      }
    }
  }

  return (
    <Container className="container route-container">
      <h3>{isSearchForm ? 'Wyszukaj trasę' : 'Dodaj trasę'}</h3>
      <Form className="form route-form">
        <FloatingLabel label="Skąd jedziesz?">
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

        <FloatingLabel label="Dokąd jedziesz?">
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
            <FloatingLabel label="Najwcześniejsza data wyjazdu">
              <Form.Control
                type="date"
                id={`${fieldIds.minDate}`}
                isInvalid={errors.minDate}
                ref={minDateRef}
                value={minDateVal}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.minDate}
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel label="Najpóźniejsza data wyjazdu">
              <Form.Control
                type="date"
                id={`${fieldIds.maxDate}`}
                isInvalid={errors.maxDate}
                ref={maxDateRef}
                value={maxDateVal}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.maxDate}
              </Form.Control.Feedback>
            </FloatingLabel>
          </>
        ) : (
          <FloatingLabel label="Data wyjazdu">
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

        <FloatingLabel label="Liczba wolnych miejsc dla koni">
          <Form.Control
            type="text"
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

        <FloatingLabel
          label={
            isSearchForm
              ? 'Maksymalna cena za 1 konia (PLN)'
              : 'Cena za 1 konia (PLN)'
          }
        >
          <Form.Control
            type="text"
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

        <FloatingLabel label="Liczba wolnych miejsc dla ludzi">
          <Form.Control
            type="text"
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

        <FloatingLabel
          label={
            isSearchForm
              ? 'Maksymalna cena za 1 osobę (PLN)'
              : 'Cena za 1 osobę (PLN)'
          }
        >
          <Form.Control
            type="text"
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
        <Button
          onClick={handleSubmit}
          variant="dark"
          className="btn-dark btn-form"
        >
          {isSearchForm ? 'Szukaj' : 'Dodaj'}
        </Button>
      </Form>
    </Container>
  );
}

FormContainer.propTypes = {
  isSearchForm: PropTypes.bool.isRequired,
};

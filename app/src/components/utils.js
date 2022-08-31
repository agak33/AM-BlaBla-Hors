import axios from 'axios';

export async function fetchSessionToken(formData, isRegistered) {
  let statusCode = 400,
    token = '',
    errorMessage = '';

  if (!isRegistered) {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/session/register/`, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        statusCode = response.status;
        token = response.data.token;
      })
      .catch((err) => {
        statusCode = err.response.status;
        errorMessage = err.response.data.detail;
      });
  } else {
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/session/login/`,
        {},
        {
          auth: {
            username: formData.email,
            password: formData.password,
          },
        }
      )
      .then((response) => {
        statusCode = response.status;
        token = response.data.token;
      })
      .catch((err) => {
        statusCode = err.response.status;
        errorMessage = err.response.data.detail;
      });
  }

  return { statusCode, token, errorMessage };
}

export async function postNewRoute(data) {
  let statusCode = 400;
  await axios
    .post(`${process.env.REACT_APP_API_URL}/route/`, data, {
      headers: {
        Authorization: `Token ${JSON.parse(
          window.localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
        )}`,
      },
    })
    .then((response) => {
      statusCode = response.status;
    })
    .catch((err) => {
      statusCode = err.response.status;
    });

  return { statusCode };
}

export async function destroySessionToken(token) {
  let statusCode = 400,
    errorMessage = '';
  await axios
    .delete(`${process.env.REACT_APP_API_URL}/session/logout/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => {
      statusCode = response.status;
    })
    .catch((err) => {
      statusCode = err.response.status;
      errorMessage = err.response.data;
    });

  return { statusCode, errorMessage };
}

export async function fetchAllCurrencies() {
  const response = await axios.get('https://api.frankfurter.app/currencies');
  return response.data;
}

export async function isSessionValid(token) {
  let isValid = false;
  await axios
    .post(
      `${process.env.REACT_APP_API_URL}/session/valid/`,
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((response) => {
      isValid = response.status === 200;
    })
    .catch((err) => {
      return false;
    });
  return isValid;
}

export function extractData(formData, fields) {
  let extracted = {};
  Object.values(fields).forEach((value) => {
    if (formData[value]) {
      extracted[value] = formData[value].value;
    }
  });
  return extracted;
}

export function convertCurrencies(from, amount, to) {
  const fx = require('money');
  console.log(fx.convert(12.99, { from: 'GBP', to: 'HKD' }));
}

export async function signUpForRoute(routeUUID, animalsNum, peopleNum) {
  let statusCode = 400;
  await axios
    .post(
      `${process.env.REACT_APP_API_URL}/route/passenger/`,
      {
        route: routeUUID,
        animals_num: animalsNum,
        people_num: peopleNum,
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
      statusCode = response.status;
    })
    .catch((err) => {
      statusCode = err.response.status;
    });
  return statusCode;
}

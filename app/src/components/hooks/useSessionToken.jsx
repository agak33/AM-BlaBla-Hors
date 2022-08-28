import { useState, useEffect } from 'react';
import { isSessionValid } from '../utils';

export function useSessionToken() {
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    async function checkToken() {
      const currToken =
        JSON.parse(
          window.localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
        ) ?? '';

      console.log(currToken);
      if (currToken) {
        const response = await isSessionValid(currToken);
        if (response) {
          setIsValid(true);
        } else {
          window.localStorage.removeItem(process.env.REACT_APP_TOKEN_NAME);
        }
      }
      setIsLoading(false);
    }

    checkToken();
  }, []);

  return { isLoading, isValid };
}

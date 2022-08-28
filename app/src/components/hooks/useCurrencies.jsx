import { useEffect, useState } from 'react';
import { fetchAllCurrencies } from '../utils';

export function useCurrencies() {
  const [isLoading, setIsLoading] = useState(true);
  const [currencies, setCurrencies] = useState({});

  useEffect(() => {
    fetchAllCurrencies().then((response) => {
      setCurrencies(Object.keys(response));
      setIsLoading(false);
    });
  }, []);

  return { isLoading, currencies };
}

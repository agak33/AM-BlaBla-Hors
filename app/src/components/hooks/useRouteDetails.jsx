import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

export function useRouteDetails(slug) {
  const [isLoading, setIsLoading] = useState(true);
  const [route, setRoute] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    async function fetch() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/route/${slug}/`,
          {
            headers: {
              Authorization: `Token ${JSON.parse(
                window.localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
              )}`,
            },
          }
        );

        if (response.status === 200) {
          setRoute(response.data);
          setIsValid(true);
        }
      } catch (err) {}

      setIsLoading(false);
    }
    fetch();
  }, [slug]);

  return { isLoading, isValid, route };
}

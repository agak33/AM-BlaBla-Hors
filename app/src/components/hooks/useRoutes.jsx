import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

export function useRoutes(searchParams, isUserList) {
  const [routes, setRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/route/${
          isUserList ? '' : 'filtered_offers/'
        }${isUserList ? '' : searchParams}`,
        {
          headers: {
            Authorization: `Token ${JSON.parse(
              window.localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
            )}`,
          },
        }
      );
      if (response.status === 200) {
        setRoutes(response.data);
      }
      setIsLoading(false);
    }
    fetch();
  }, [searchParams]);

  return { isLoading, routes };
}

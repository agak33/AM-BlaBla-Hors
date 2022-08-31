import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

export function useStatuses() {
  const [isLoading, setIsLoading] = useState(false);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    async function fetch() {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/route/passenger/`,
        {
          headers: {
            Authorization: `Token ${JSON.parse(
              window.localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
            )}`,
          },
        }
      );

      setStatuses(response.data);
      setIsLoading(false);
    }
    fetch();
  }, []);

  return { isLoading, statuses };
}

import axios from 'axios';
import { useState, useEffect } from 'react';

export function useUserSettings(token) {
  const [settings, setSettings] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/session/user_settings/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          setSettings(response.data);
          setIsLoading(false);
        });
    }
    fetchData();
  }, [token]);

  return { isLoading, settings };
}

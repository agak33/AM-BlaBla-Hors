import axios from 'axios';
import { useEffect, useState } from 'react';

export function useLandingContent() {
  const [content, setContent] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      const token = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
      );
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/session/landing_content/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setContent(response.data);
        setIsValid(true);
      } catch (err) {}
      setIsLoading(false);
    }

    fetchContent();
  }, []);

  return { isLoading, isValid, content };
}

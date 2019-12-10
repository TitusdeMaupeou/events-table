// useFetch.js
import { useEffect, useRef, useState } from 'react';

const log = (...args) => console.warn(...args);

const useFetch = (url, options) => {
  const abortControllerRef = useRef(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    abortControllerRef.current = new AbortController();
  });

  useEffect(() => {
    const { signal } = abortControllerRef.current;

    const makeFetchHappen = async () => {
      try {
        if (!url) {
          throw new Error(`'url' is required for fetching data`);
        }

        const response = await fetch(url, { ...options, signal });
        let data;

        try {
          data = await response.json();
        } catch (error) {
          log(`useFetch: can't parse JSON, trying parsing response as text`);
          data = await response.text();
        } finally {
          setResponse(data);
        }
      } catch (error) {
        log(`useFetch: ${error.message}`);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    makeFetchHappen();

    return () => abortControllerRef.current.abort();
  }, [url, options]);

  return [loading, response, error];
};

export default useFetch;
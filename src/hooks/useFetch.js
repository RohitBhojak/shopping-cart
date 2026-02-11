import { useState, useEffect } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const getData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
          setData(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getData();

    return () => controller.abort();
  }, [url]);

  return { data, isLoading, error };
}

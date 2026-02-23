import { useState, useEffect } from "react";

const url = "https://fakestoreapi.com/products";
const DELIMITER = ",";

export default function useFetchCart(cart) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const joinedIds = Object.keys(cart).sort().join(DELIMITER);

  useEffect(() => {
    const controller = new AbortController();

    const getData = async () => {
      setIsLoading(true);
      setError(null);

      if (!joinedIds) {
        setIsLoading(false);
        setData([]);
        return;
      }

      const ids = joinedIds.split(DELIMITER);

      try {
        const promises = ids.map((id) =>
          fetch(`${url}/${id}`, { signal: controller.signal }).then((res) => {
            if (!res.ok) throw new Error("Failed to fetch product");
            return res.json();
          }),
        );

        const results = await Promise.all(promises);
        setData(results);
        console.log(results);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getData();

    return () => controller.abort();
  }, [joinedIds]);

  return { data, isLoading, error };
}

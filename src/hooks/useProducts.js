import { useState, useEffect } from "react";

export default function useProducts() {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const getProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products", {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        const data = await response.json();
        setProducts(data.filter((item) => item.category !== "electronics"));
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Abort");
          return;
        }
        setError(error);
        setProducts(null);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();

    return () => controller.abort();
  }, []);

  return { products, isLoading, error };
}

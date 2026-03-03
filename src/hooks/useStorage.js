import { useEffect } from "react";

export default function useStorage(cart) {
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
}

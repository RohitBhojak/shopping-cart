// import { useState, useEffect } from "react";
import useProducts from "../../hooks/useProducts";
import ProductItem from "../../components/ProductItem";

export default function Products() {
  const { products, isLoading, error } = useProducts("https://fakestoreapi.com/products");
  const { products: categories } = useProducts("https://fakestoreapi.com/products/categories");

  console.log(categories);
  return (
    <div>
      {isLoading && <div>Loading</div>}
      {error && <div>{error}</div>}
      {products && <>{products.map((product) => ProductItem(product))}</>}
    </div>
  );
}

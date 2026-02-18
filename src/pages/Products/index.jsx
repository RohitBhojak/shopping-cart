// import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import ProductItem from "../../components/ProductItem";
import styles from "./Products.module.css";

const url = "https://fakestoreapi.com/products";

export default function Products() {
  const { data, isLoading, error } = useFetch(url);
  const products = data?.filter((item) => item.category !== "electronics");

  return (
    <div className={styles.container}>
      {isLoading && <div>Loading</div>}
      {error && <div>{error}</div>}
      {products && products.map((product) => <ProductItem key={product.id} product={product} />)}
    </div>
  );
}

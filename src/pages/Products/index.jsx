// import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import ProductItem from "../../components/ProductItem";
import styles from "./Products.module.css";
import ProductItemSkeleton from "../../components/ProductItem/ProductItemSkeleton";

const url = "https://fakestoreapi.com/products";

export default function Products() {
  const { data, isLoading, error } = useFetch(url);
  const products = data?.filter((item) => item.category !== "electronics");

  return (
    <main className={styles.container}>
      {isLoading &&
        Array(15)
          .fill(0)
          .map((_, i) => <ProductItemSkeleton key={i} />)}
      {error && <div>{error}</div>}
      {products && products.map((product) => <ProductItem key={product.id} product={product} />)}
    </main>
  );
}

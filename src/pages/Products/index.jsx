// import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import ProductItem from "./ProductItem";
import styles from "./Products.module.css";
import ProductItemSkeleton from "./ProductItem/ProductItemSkeleton";

const url = "https://fakestoreapi.com/products";

export default function Products() {
  const { data: products, isLoading, error } = useFetch(url);
  if (error) throw new Error(error);

  return (
    <main className={styles.container}>
      {isLoading &&
        Array(15)
          .fill(0)
          .map((_, i) => <ProductItemSkeleton key={i} />)}
      {products && products.map((product) => <ProductItem key={product.id} product={product} />)}
    </main>
  );
}

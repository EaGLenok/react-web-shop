import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { fetchProducts } from "../redux/slices/itemSlice";
import Item from "../components/Item";

const Home = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.products); // Используйте 'products' вместо 'product'
  const loading = useAppSelector((state) => state.product.loading);
  const error = useAppSelector((state) => state.product.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {products && products.length > 0 ? (
        products.map((product) => (
          <Item
            key={product.id}
            id={product.id}
            title={product.title}
            category={product.category}
            description={product.description}
            image={product.image}
          />
        ))
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default Home;

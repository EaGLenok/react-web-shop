import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { fetchProducts } from "../redux/slices/itemSlice";
import { useNavigate } from "react-router-dom";

import "./Home.scss";
import Item from "../components/Item";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.products);
  const loading = useAppSelector((state) => state.product.loading);
  const error = useAppSelector((state) => state.product.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const onClickHandle = (event: React.MouseEvent<HTMLDivElement>) => {
    navigate(`/fullItem/${event.currentTarget.id}`);
  };

  return (
    <div className="wrapper_home">
      <div className="content">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div
              id={product.id.toString()}
              onClick={onClickHandle}
              className="content-item-wrapper"
            >
              <Item
                key={product.id}
                id={product.id}
                title={product.title}
                category={product.category}
                description={product.description}
                image={product.image}
                price={product.price}
              />
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default Home;

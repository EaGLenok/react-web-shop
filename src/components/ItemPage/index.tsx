import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { fetchProduct } from "../../redux/slices/singleItemSlice";

const ItemPage = () => {
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.singleProduct.product);
  const loading = useAppSelector((state) => state.singleProduct.loading);
  const error = useAppSelector((state) => state.singleProduct.error);
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      {product && (
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ flex: 1 }}>
            <img
              src={product.image}
              alt={product.title}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
          <div style={{ flex: 2 }}>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            <p>
              <strong>Category:</strong> ${product.category}
            </p>
            <div>
              <span>
                <strong>Rating:</strong> ${product.rating.rate}
              </span>
              <span> ({product.rating.count} reviews)</span>
            </div>
            {/* Добавьте сюда кнопку покупки или другой функционал */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemPage;

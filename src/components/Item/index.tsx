import React from "react";

interface Items {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
}
const Item: React.FC<Items> = ({ id, title, category, description, image }) => {
  console.log(id);
  return (
    <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
      <h2>{title}</h2>
      <img src={image} alt={title} style={{ width: "100%", height: "auto" }} />
      <p>
        <strong>Category:</strong> {category}
      </p>
      <p>
        <strong>Description:</strong> {description}
      </p>
      <p>
        <small>ID: {id}</small>
      </p>
    </div>
  );
};

export default Item;

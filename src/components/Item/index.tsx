import React from "react";
import styles from "./Item.module.scss";

interface Items {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  price: string;
}
const Item: React.FC<Items> = ({
  id,
  title,
  category,
  description,
  image,
  price,
}) => {
  return (
    <div className={styles.item_wrapper}>
      <div className="main_layout-img">
        <img width={370} height={466} src={image} alt="" />
      </div>
      <div className={styles.card_description}>
        <h4>{title}</h4>
        <p>{price}</p>
      </div>
    </div>
  );
};

export default Item;

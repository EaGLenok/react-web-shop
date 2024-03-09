import React from "react";
import styles from "./Header.module.scss";
import logo from "../../assets/logo.svg";
import lupa from "../../assets/lupa.svg";
import favorite from "../../assets/favorite.svg";
import cart from "../../assets/cart.svg";

const Header: React.FC = () => {
  return (
    <div className={styles.header_wrapper}>
      <div className={styles.content_wrap}>
        <h5>HOME</h5>
        <h5>SHOP</h5>
        <h5>PAGES</h5>
      </div>
      <div className="wrapper-logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="wrapper-info">
        <img src={lupa} alt="lupa" />
        <img src={favorite} alt="favorite" />
        <img src={cart} alt="cart" />
      </div>
    </div>
  );
};

export default Header;

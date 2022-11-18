import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Navbar = (props) => {
  const doUserLogOut = function () {
    window.location.reload(false);
  };

  const currentUser = props.currentUser;
  const userName = currentUser.map((el) => el.name);

  return (
    <>
      <header className="navbar">
        <Link className="orders" to="/">
          Все заказы
        </Link>
        <Link className="new-orders" to="/neworder">
          Добавить заказ
        </Link>
        <button className="logout-button" onClick={doUserLogOut}>
          Выйти
        </button>
        <h3 className="name">{userName}</h3>
      </header>

      <Outlet />
    </>
  );
};

export default Navbar;

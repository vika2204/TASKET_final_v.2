import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
import { logout } from "@/entities/user/model/userThunk";
import { CLIENT_ROUTES } from "@/app/router";
import "./Nav.css";

export function Nav() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigate(CLIENT_ROUTES.AUTH);
  };

  const menu = (
    <div className="navbar-dropdown is-right ">
      <Link to={CLIENT_ROUTES.PROFILE} className="navbar-item">
        Личный кабинет
      </Link>
      <hr className="navbar-divider" />
      <a className="navbar-item" onClick={logoutHandler}>
        Выйти
      </a>
    </div>
  );

  return (
    <nav
      className="navbar"
      role="navigation"
      aria-label="main navigation"
      style={{ backgroundColor: "#2c3e50" }}
    >
      <div className="navbar-brand">
        <Link
          to={CLIENT_ROUTES.HOME}
          className="navbar-item"
          style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#fff" }}
        >
          TASKS
        </Link>
        <a
          role="button"
          className={`navbar-burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          onClick={toggleMenu}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isActive ? "is-active" : ""}`}
      >
        <div className="navbar-end">
          {user ? (
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link" style={{ color: "#fff" }}>
                Привет! {user.username}
              </a>
              {menu}
            </div>
          ) : (
            <div
              className="navbar-item "
              style={{ display: "flex", alignItems: "center" }}
            >
              <Link
                to={CLIENT_ROUTES.AUTH}
                className="navbar-item"
                style={{ color: "#fff", marginRight: "0.5rem" }}
              >
                ВХОД
              </Link>
              <Link
                to={CLIENT_ROUTES.REG}
                className="navbar-item"
                style={{ color: "#fff" }}
              >
                РЕГИСТРАЦИЯ
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

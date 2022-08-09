import React from "react";
import { NavLink } from "react-router-dom";

import { ThemeConsumer } from "../contexts/theme";

export default function Navbar() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
        <header className="header">
          <div className="logo">
            <NavLink to="/">HK Clone</NavLink>
          </div>
          <nav className="nav">
            <ul role="list" className="nav-links">
              <li className="nav-link">
                <NavLink
                  exact
                  to="/"
                  activeStyle={{ color: "var(--clr-primary)" }}
                >
                  Top
                </NavLink>
              </li>
              <li className="nav-link">
                <NavLink
                  to="/new"
                  activeStyle={{ color: "var(--clr-primary)" }}
                >
                  New
                </NavLink>
              </li>
            </ul>
          </nav>
          <button className="theme-switcher" onClick={toggleTheme}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </header>
      )}
    </ThemeConsumer>
  );
}

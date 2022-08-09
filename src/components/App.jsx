import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./Navbar";
import "../index.css";
import Stories from "./Stories";
import Item from "./Item";
import User from "./User";
import { ThemeProvider } from "../contexts/theme";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: "dark",
      toggleTheme: () => {
        this.setState(({ theme }) => ({
          theme: theme === "dark" ? "light" : "dark",
        }));
      },
    };
  }
  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div data-theme={this.state.theme}>
            <div className="container">
              <Navbar />
              <main className="main">
                <Route exact path="/" component={Stories} />
                <Route path="/new" component={Stories} />
                <Route path="/item" component={Item} />
                <Route path="/user" component={User} />
              </main>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

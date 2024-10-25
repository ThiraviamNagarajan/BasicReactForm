import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import rootReducer from "./CombineReducer/CombineReducer.js";
import { createStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

const store = createStore(rootReducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

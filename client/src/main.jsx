import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./store";

const el = document.querySelector("#root");

const root = ReactDOM.createRoot(el);

root.render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>
);

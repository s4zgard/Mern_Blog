import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import ThemeProvider from "./components/ThemeProvider";

const el = document.querySelector("#root");

const root = ReactDOM.createRoot(el);

root.render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </PersistGate>
);

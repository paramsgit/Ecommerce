import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import {store,persistor} from "./store";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import { PersistGate } from 'redux-persist/integration/react'
import AlertTemplate from "react-alert-template-basic";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>

    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
    </PersistGate>
  </Provider>
);

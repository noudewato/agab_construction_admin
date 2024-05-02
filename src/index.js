import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/index.css";
import "./index.css";
import App from "./App";
import store from "./store/store"
import { ThemeToggleProvider } from "./contexts/ThemeContext";
import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'react-quill/dist/quill.snow.css';
import "react-image-gallery/styles/css/image-gallery.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { Provider } from "react-redux";
import { CookiesProvider } from 'react-cookie';
import "react-image-crop/dist/ReactCrop.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider>
    <ThemeToggleProvider>
      <CssBaseline />
      <Router>
        <Provider store={store}>
          <ToastContainer />
          <App />
        </Provider>
      </Router>
    </ThemeToggleProvider>
    </CookiesProvider>
  </React.StrictMode>
);

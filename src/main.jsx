import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { NotificationProvider } from "./context/NotificationContext";

import "./index.css";
import "leaflet/dist/leaflet.css"; // needed for map


ReactDOM.createRoot(document.getElementById("root")).render(
  
   <NotificationProvider>
    <App />
  </NotificationProvider>
  
);
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

//REDUX
// import { Provider } from "react-redux";
// import{ store, persistor} from "./redux/store.js"

//REDUX PERSISTENCE....
// import { PersistGate } from "redux-persist/integration/react";
// import { persistStore } from "redux-persist";
import { BrowserRouter } from "react-router-dom";

//ENVUELVE TODO PARA PODER INTERACTUAR
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
  </React.StrictMode>
);
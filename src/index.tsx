import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import ScrollToTop from "./component/ScrollToTop"; // 路由跳轉回到頁面頂部
import { AuthContextProvider } from "./context/AuthContext";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HashRouter>
        <ScrollToTop>
          <StrictMode>
            <AuthContextProvider>
              <App />
            </AuthContextProvider>
          </StrictMode>
        </ScrollToTop>
      </HashRouter>
    </PersistGate>
  </Provider>
);

reportWebVitals();

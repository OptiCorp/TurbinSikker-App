import { MsalProvider } from "@azure/msal-react";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { pca } from "./msalconfig.ts";
import GlobalStyles from "./style/GlobalStyles.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MsalProvider instance={pca}>
      <BrowserRouter>
        <GlobalStyles />
        <App />
      </BrowserRouter>
    </MsalProvider>
  </React.StrictMode>,
);

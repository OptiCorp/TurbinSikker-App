import { Configuration, PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

const configuration: Configuration = {
  auth: {
    clientId: "3fe72596-7439-4d86-b45e-c8ae20fd6075",
    authority:
      "https://login.microsoftonline.com/1a3889b2-f76f-4dd8-831e-b2d5e716c986/",
  },
};

const pca = new PublicClientApplication(configuration);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MsalProvider instance={pca}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MsalProvider>
  </React.StrictMode>
);

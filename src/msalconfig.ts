import { LogLevel, PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "3fe72596-7439-4d86-b45e-c8ae20fd6075",
    authority:
      "https://login.microsoftonline.com/1a3889b2-f76f-4dd8-831e-b2d5e716c986",
  },
  cache: {
    cacheLocation: "sessionStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  scopes: ["api://cc0af56e-ee49-46ce-aad6-010dce5bcbb6/User.Read"],
  system: {
    loggerOptions: {
      loggerCallback: (level: any, message: any, containsPii: any) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

export const pca = new PublicClientApplication(msalConfig);

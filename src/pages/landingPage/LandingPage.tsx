import { useEffect } from "react";
import useAuth from "./context/LandingPageContextProvider";
export const LandingPage = () => {
  const {
    accounts,

    accountname,

    inProgress,
  } = useAuth();

  useEffect(() => {}, [accountname, accounts]);

  if (accounts.length > 0) {
    return (
      <>
        <span>
          There are currently {accounts.length} users signed in!{" "}
          <p>{accountname}</p>
        </span>
      </>
    );
  } else if (inProgress === "login") {
    return <span>Login is currently in progress!</span>;
  } else {
    return <span>There are currently no users signed in!</span>;
  }
};

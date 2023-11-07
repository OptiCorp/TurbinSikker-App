import { useEffect, useState } from "react";
import useGlobal from "../../../context/globalContextProvider";

export function useHasPermission() {
  const { currentUser } = useGlobal();
  const [hasPermission, setHasPermission] = useState<boolean | undefined>(
    false,
  );
  const userRoleName = currentUser?.userRole;

  useEffect(() => {
    setHasPermission(
      userRoleName?.includes("Admin") || userRoleName?.includes("Leader"),
    );
  }, [userRoleName]);

  return { useHasPermission, hasPermission };
}

import { useEffect, useState } from "react";
import { useApiContext } from "../../context/apiContextProvider";

export function useHasPermission() {
  const { currentUser } = useApiContext();
  const [hasPermission, setHasPermission] = useState<boolean | undefined>(
    false
  );
  const userRoleName = currentUser?.userRole.name;

  useEffect(() => {
    setHasPermission(
      userRoleName?.includes("Admin") || userRoleName?.includes("Leader")
    );
  }, [userRoleName]);

  return { useHasPermission, hasPermission };
}

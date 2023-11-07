import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";

import { useEffect, useState } from "react";
import apiService from "../../../../services/api";
import { useAddUser } from "../../hooks/useAddUser";
import { useHasPermission } from "../../hooks/useHasPermission";

export const RoleSelector = () => {
  const api = apiService();
  const { control, setValue } = useFormContext();
  const { hasPermission } = useHasPermission();
  const { user } = useAddUser();
  const [userRoles, setUserRoles] = useState<string[]>();

  useEffect(() => {
    (async () => {
      const userRolesFromApi = await api.getAllUsers();
      setUserRoles(userRolesFromApi.map((x) => x.userRole));
    })();
  }, []);

  const currentDefaultValue = userRoles?.find(
    (role) => role === user?.userRole,
  );
  // const options = userRoles?.map(
  //     ({userRole}: {userRole: string }) => ({
  //         value: userRole,
  //         label: userRole,
  //     })
  // )

  return (
    <>
      <Controller
        control={control}
        name="userRoleId"
        rules={{
          required: "Required",
        }}
        defaultValue={currentDefaultValue}
        render={({ field: { onChange, value } }) => {
          if (!value && currentDefaultValue) {
            setValue("userRoleId", currentDefaultValue);
          }

          return (
            <Select
              placeholder={user?.userRole}
              isDisabled={!hasPermission}
              options={userRoles}
              value={userRoles?.find(() => userRoles === value)}
              onChange={(val) => {
                onChange(val);
              }}
            />
          );
        }}
      />
    </>
  );
};

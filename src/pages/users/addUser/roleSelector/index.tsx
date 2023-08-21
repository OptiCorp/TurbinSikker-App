import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import { useAddUser } from "../hooks/useAddUser";
import { Option } from "../types";

export const RoleSelector = () => {
  const { control, setValue } = useFormContext();
  const { user } = useAddUser();
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    const fetchUserRoles = async () => {
      const res = await fetch("https://localhost:7290/api/GetAllUserRoles");
      if (!res.ok) throw new Error("Failed with HTTP code " + res.status);
      const data = await res.json();

      const options = data.map(
        ({ id, name }: { id: string; name: string }) => ({
          value: id,
          label: name,
        })
      );
      setOptions(options);
    };
    fetchUserRoles();
  }, []);
  const currentDefaultValue = options.find(
    (option) => option.label === user?.userRole.name
  );
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
            setValue("userRoleId", currentDefaultValue.value);
          }

          return (
            <Select
              placeholder={user?.userRole.name}
              options={options}
              value={options.find((c) => c.value === value)}
              onChange={(val) => {
                onChange(val?.value);
              }}
            />
          );
        }}
      />
    </>
  );
};

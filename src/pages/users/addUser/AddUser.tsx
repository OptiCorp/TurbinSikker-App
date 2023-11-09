import { FC } from "react";
import { FormProvider } from "react-hook-form";
import { useHasPermission } from "../hooks/useHasPermission";

import { InputField } from "./inputField";

import { DefaultNavigation } from "../../../components/navigation/hooks/DefaultNavigation";
import { useAddUser } from "../hooks/useAddUser";
import { ModifyUserNav } from "./modifyUserNav";
import { RoleSelector } from "./roleSelector";
import { StatusSwitch } from "./status/StatusSwitch";
import { FormWrapper, Wrapper } from "./styles";
export const AddUser: FC = () => {
  const { methods, onSubmit, user } = useAddUser();
  const { handleSubmit } = methods;
  const { hasPermission } = useHasPermission();
  return (
    <FormProvider {...methods}>
      <Wrapper>
        <FormWrapper onSubmit={handleSubmit(onSubmit)} id="add-user">
          <InputField name="username" label="Username" placeholder="username" />
          <InputField
            name="firstName"
            label="First name"
            placeholder="first name"
          />
          <InputField
            name="lastName"
            label="Last name"
            placeholder="last name"
          />
          <InputField
            name="email"
            label="email"
            placeholder="email"
            type="email"
          />
          <RoleSelector />
          {user && <StatusSwitch />}
        </FormWrapper>
      </Wrapper>
      {hasPermission ? (
        <ModifyUserNav />
      ) : (
        <DefaultNavigation hideNavbar={false} />
      )}
    </FormProvider>
  );
};

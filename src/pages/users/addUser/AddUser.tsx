import { FC } from "react";
import { FormProvider } from "react-hook-form";

import { UserEntity } from "src/models/UserEntity";

import { useHasPermission } from "../hooks/useHasPermission";
import { useAddUser } from "./hooks/useAddUser";
import { InputField } from "./inputField";
import { ModifyUserNav } from "./modifyUserNav/modifyUserNav";
import { RoleSelector } from "./roleSelector";
import { StatusSwitch } from "./status/StatusSwitch";
import { FormWrapper, UserInfoWrapper, UserTitle, Wrapper } from "./styles";

export interface IAddUser {
  user: UserEntity;
}

export const AddUser: FC = () => {
  const { methods, onSubmit, user } = useAddUser();
  const { handleSubmit } = methods;

  const { hasPermission } = useHasPermission();

  return (
    <>
      {!hasPermission ? (
        <UserInfoWrapper>
          <div>
            <UserTitle>
              {user?.firstName} {user?.lastName}
            </UserTitle>
            <p>First name: {user?.firstName}</p>
            <p>Last name: {user?.lastName}</p>
            <p>Username: {user?.username}</p>
            <p>Role: {user?.userRole.name}</p>
            <p>Email: {user?.email}</p>
          </div>
        </UserInfoWrapper>
      ) : (
        <FormProvider {...methods}>
          <Wrapper>
            <FormWrapper
              style={{ cursor: "pointer" }}
              onSubmit={handleSubmit(onSubmit)}
              id="add-user"
            >
              <InputField
                name="username"
                label="Username"
                placeholder="username"
              />
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
          <ModifyUserNav />
        </FormProvider>
      )}
    </>
  );
};

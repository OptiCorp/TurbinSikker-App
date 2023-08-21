import { FC } from 'react'
import { FormProvider } from 'react-hook-form'

import { UserEntity } from 'src/pages/users/context/models/UserEntity'

import { useAddUser } from './hooks/useAddUser'
import { InputField } from './inputField'
import { ModifyUserNav } from './modifyUserNav/modifyUserNav'
import { RoleSelector } from './roleSelector'
import { StatusSwitch } from './status/StatusSwitch'
import { FormWrapper, Wrapper } from './styles'

export interface IAddUser {
    user: UserEntity
}

export const AddUser: FC = () => {
    const { methods, onSubmit, user } = useAddUser()
    const { handleSubmit } = methods

    return (
        <FormProvider {...methods}>
            <Wrapper>
                <FormWrapper onSubmit={handleSubmit(onSubmit)} id="add-user">
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
    )
}

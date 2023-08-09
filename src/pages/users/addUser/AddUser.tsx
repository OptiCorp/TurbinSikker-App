import { FC } from 'react'
import { FormProvider } from 'react-hook-form'

import { UserEntity } from 'src/models/UserEntity'
import { EditUserNav } from '../Edit/editUserNav'
import { AddUserButtonNavigation } from './addUserNavigation/AddUserNAV'
import { useAddUser } from './hooks/useAddUser'
import { InputField } from './inputField'
import { RoleSelector } from './roleSelector'
import { StatusSwitch } from './status/StatusSwitch'
import { FormWrapper, Wrapper } from './styles'

export interface IAddUser {
    user: UserEntity
}

export const AddUser: FC = () => {
    const { methods, onSubmit, location, user } = useAddUser()
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

            {location === '/AddUser/' ? (
                <AddUserButtonNavigation />
            ) : (
                <EditUserNav />
            )}
        </FormProvider>
    )
}

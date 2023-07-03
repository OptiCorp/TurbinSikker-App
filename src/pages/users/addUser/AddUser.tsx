import { Wrapper, FormWrapper } from './styles'
import { FormProvider } from 'react-hook-form'
import { FC } from 'react'
import { AddUserButtonNavigation } from './addUserNavigation/AddUserNAV'
import { EditUserNav } from '../Edit/editUserNav'
import { InputField } from './inputField'
import { RoleSelector } from './roleSelector'
import { useAddUser } from './hooks/useAddUser'
import { StatusSwitch } from './status/StatusSwitch'
import { IUser } from '../../context/apiContextProvider'

export interface IAddUser {
    user: IUser
}

export const AddUser: FC = () => {
    const { methods, onSubmit, location, user } = useAddUser()
    const { handleSubmit } = methods

    return (
        <FormProvider {...methods}>
            <Wrapper>
                hb
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

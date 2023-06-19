import { Wrapper, FormWrapper } from './styles'
import {
    useForm,
    SubmitHandler,
    Controller,
    FormProvider,
} from 'react-hook-form'
import { TextField } from '@equinor/eds-core-react'
import Select from 'react-select'
import { Icon } from '@equinor/eds-core-react'
import { error_filled } from '@equinor/eds-icons'
import useAuth from '../../landingPage/context/LandingPageContextProvider'
import { AddUserButtonNavigation } from './addUserNavigation/AddUserNAV'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ApiContext } from '../context/apiContextProvider'

import { useLocation } from 'react-router'
import { EditUserNav } from '../Edit/editUserNav'

interface Option {
    value: string
    label: string
}

export type FormValues = {
    firstName: string
    lastName: string
    password: string
    userRoleId: string | Option
    email: string
    options: string | Option
    username: string
    created: string
}

export const AddUser = () => {
    const { idToken } = useAuth()
    const navigate = useNavigate()
    const methods = useForm<FormValues>()

    const {
        handleSubmit,

        control,
        register,
        reset,
    } = methods
    const { id } = useParams()

    const { result } = useContext(ApiContext)
    const appLocation = useLocation()
    const user = result.find((x) => x.id === id)

    const [options, setOptions] = useState<Option[]>([])

    useEffect(() => {
        if (!user) return
        reset(user)
    }, [user])

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        if (appLocation.pathname === '/AddUser/') {
            await fetch('https://localhost:7290/api/AddUser', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${idToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            reset()

            navigate('/ListUsers', { state: { newUser: data.email } })
        } else {
            await fetch(`https://localhost:7290/api/UpdateUser?id=${id}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${idToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            navigate('/ListUsers', { state: { newUser: data.email } })
        }
    }

    useEffect(() => {
        const fetchUserRoles = async () => {
            const res = await fetch(
                'https://localhost:7290/api/GetAllUserRoles'
            )
            if (!res.ok) throw new Error('Failed with HTTP code ' + res.status)
            const data = await res.json()

            const options = data.map((item: any) => ({
                value: item.id,
                label: item.name,
            }))
            setOptions(options)
        }
        fetchUserRoles()
    }, [])

    return (
        <FormProvider {...methods}>
            <Wrapper>
                <FormWrapper onSubmit={handleSubmit(onSubmit)} id="add-user">
                    <Controller
                        defaultValue=""
                        name="username"
                        control={control}
                        rules={{
                            required: 'Required',
                        }}
                        render={({
                            field: { ref, ...props },
                            fieldState: { error },
                        }) => (
                            <TextField
                                {...props}
                                id={props.name}
                                inputRef={ref}
                                inputIcon={
                                    error ? (
                                        <Icon
                                            data={error_filled}
                                            title="error"
                                        />
                                    ) : undefined
                                }
                                label="Username"
                                placeholder="username"
                                {...register('username')}
                                helperText={error?.message}
                                variant={error ? 'error' : undefined}
                            />
                        )}
                    />
                    <Controller
                        defaultValue=""
                        name="firstName"
                        control={control}
                        rules={{
                            required: 'Required',
                        }}
                        render={({
                            field: { ref, ...props },
                            fieldState: { error },
                        }) => (
                            <TextField
                                {...props}
                                id={props.name}
                                inputRef={ref}
                                inputIcon={
                                    error ? (
                                        <Icon
                                            data={error_filled}
                                            title="error"
                                        />
                                    ) : undefined
                                }
                                label="First name"
                                placeholder="name"
                                {...register('firstName')}
                                helperText={error?.message}
                                variant={error ? 'error' : undefined}
                            />
                        )}
                    />

                    <Controller
                        defaultValue=""
                        name="lastName"
                        control={control}
                        rules={{
                            required: 'Required',
                        }}
                        render={({
                            field: { ref, ...props },
                            fieldState: { error },
                        }) => (
                            <TextField
                                {...props}
                                id={props.name}
                                inputRef={ref}
                                inputIcon={
                                    error ? (
                                        <Icon
                                            data={error_filled}
                                            title="error"
                                        />
                                    ) : undefined
                                }
                                label="Last name"
                                placeholder="name"
                                {...register('lastName')}
                                helperText={error?.message}
                                variant={error ? 'error' : undefined}
                            />
                        )}
                    />
                    <Controller
                        defaultValue=""
                        name="email"
                        control={control}
                        rules={{
                            required: 'Required',
                        }}
                        render={({
                            field: { ref, ...props },
                            fieldState: { error },
                        }) => (
                            <TextField
                                {...props}
                                id={props.name}
                                inputRef={ref}
                                inputIcon={
                                    error ? (
                                        <Icon
                                            data={error_filled}
                                            title="error"
                                        />
                                    ) : undefined
                                }
                                helperText={error?.message}
                                placeholder="email"
                                label="email"
                                type="email"
                                {...register('email')}
                                variant={error ? 'error' : undefined}
                            />
                        )}
                    />

                    <Controller
                        defaultValue=""
                        name="password"
                        control={control}
                        rules={{
                            required: 'Required',
                        }}
                        render={({
                            field: { ref, ...props },
                            fieldState: { error },
                        }) => (
                            <TextField
                                {...props}
                                id={props.name}
                                inputRef={ref}
                                inputIcon={
                                    error ? (
                                        <Icon
                                            data={error_filled}
                                            title="error"
                                        />
                                    ) : undefined
                                }
                                helperText={error?.message}
                                type="password"
                                placeholder="password"
                                label="Password"
                                {...register('password')}
                                variant={error ? 'error' : undefined}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="userRoleId"
                        rules={{
                            required: 'Required',
                        }}
                        defaultValue={options[0]}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                options={options}
                                value={options.find((c) => c.value === value)}
                                onChange={(val) => onChange(val?.value)}
                            />
                        )}
                    />
                </FormWrapper>
            </Wrapper>
            {appLocation.pathname === '/AddUser/' ? (
                <AddUserButtonNavigation />
            ) : (
                <EditUserNav />
            )}
        </FormProvider>
    )
}

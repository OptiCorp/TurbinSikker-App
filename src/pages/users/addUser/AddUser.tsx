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

type IOptions = {
    value: string
    label: string
}

export type FormValues = {
    firstName: string
    lastName: string
    password: string
    email: string
    username: string
    options: string | IOptions
    userRoleId: string | IOptions
    value: IOptions
}

const options = [
    { value: 'inspector', label: 'inspector' },
    { value: 'leader', label: 'leader' },
]

export const AddUser = () => {
    const { idToken } = useAuth()

    const methods = useForm<FormValues>()

    const {
        handleSubmit,
        formState: { errors },
        control,
        register,
        reset,
    } = methods

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        fetch('https://localhost:7290/api/AddUser', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${idToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        reset()
    }

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
                        defaultValue=""
                        control={control}
                        name="userRoleId"
                        render={({ field, value }) => (
                            <Select
                                {...field}
                                options={options}
                                value={options.find((c) => c.value === value)}
                                onChange={(val) => field.onChange(val.value)}
                            />
                        )}
                    />

                    <span
                        role="alert"
                        id="error-county-required"
                        style={{
                            color: 'red',
                            paddingTop: '0.5rem',
                            fontSize: '0.75rem',
                            display:
                                errors.options &&
                                errors.options.type === 'required'
                                    ? 'block'
                                    : 'none',
                        }}
                    >
                        Hey you! This field is required
                    </span>
                </FormWrapper>
            </Wrapper>
            <AddUserButtonNavigation />
        </FormProvider>
    )
}

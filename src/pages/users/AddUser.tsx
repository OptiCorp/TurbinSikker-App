import { Wrapper, FormWrapper } from './styles'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Button, TextField } from '@equinor/eds-core-react'
import Select from 'react-select'
import { Icon } from '@equinor/eds-core-react'
import { error_filled } from '@equinor/eds-icons'
import useAuth from '../landingPage/context/LandingPageContextProvider'

import { v4 as uuidv4 } from 'uuid'

type IOptions = {
    value: string
    label: string
}

export type FormValues = {
    first_name: string
    last_name: string
    password: string
    email: string
    username: string
    options: string | IOptions
    role_id: string | IOptions
    value: IOptions
    id: string
}

const options = [
    { value: 'inspector', label: 'inspector' },
    { value: 'leader', label: 'leader' },
]

export const AddUser = () => {
    const { idToken } = useAuth()

    const {
        handleSubmit,
        formState: { errors },
        control,
        register,
        reset,
    } = useForm<FormValues>()

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        data['id'] = uuidv4()

        fetch('https://localhost:7290/User', {
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
        <Wrapper>
            <FormWrapper onSubmit={handleSubmit(onSubmit)}>
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
                                    <Icon data={error_filled} title="error" />
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
                    name="first_name"
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
                                    <Icon data={error_filled} title="error" />
                                ) : undefined
                            }
                            label="First name"
                            placeholder="name"
                            {...register('first_name')}
                            helperText={error?.message}
                            variant={error ? 'error' : undefined}
                        />
                    )}
                />

                <Controller
                    defaultValue=""
                    name="last_name"
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
                                    <Icon data={error_filled} title="error" />
                                ) : undefined
                            }
                            label="Last name"
                            placeholder="name"
                            {...register('last_name')}
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
                                    <Icon data={error_filled} title="error" />
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
                                    <Icon data={error_filled} title="error" />
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
                    name="role_id"
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
                            errors.options && errors.options.type === 'required'
                                ? 'block'
                                : 'none',
                    }}
                >
                    Hey you! This field is required
                </span>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <Button type="submit">I have made my decisions!</Button>
                    <Button variant="outlined" onClick={() => reset()}>
                        Reset
                    </Button>
                </div>
            </FormWrapper>
        </Wrapper>
    )
}

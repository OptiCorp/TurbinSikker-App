import { Icon, TextField } from '@equinor/eds-core-react'
import { error_filled } from '@equinor/eds-icons'
import React, { FunctionComponent } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

interface InputFieldProps {
    name: string
    label: string
    placeholder?: string
    type?: React.HTMLInputTypeAttribute
}

export const InputField: FunctionComponent<InputFieldProps> = ({
    name,
    label,
    placeholder,
}) => {
    const { control, register } = useFormContext()

    return (
        <Controller
            defaultValue=""
            name={name}
            control={control}
            rules={{
                required: 'Required',
            }}
            render={({ field: { ref, ...props }, fieldState: { error } }) => (
                <TextField
                    {...props}
                    id={props.name}
                    inputRef={ref}
                    inputIcon={
                        error ? (
                            <Icon data={error_filled} title="error" />
                        ) : undefined
                    }
                    label={label}
                    type=""
                    placeholder={placeholder}
                    {...register(name)}
                    helperText={error?.message}
                    variant={error ? 'error' : undefined}
                />
            )}
        />
    )
}

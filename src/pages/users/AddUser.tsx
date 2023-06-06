import { Wrapper, FormWrapper } from './styles'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Autocomplete, Button, TextField } from '@equinor/eds-core-react'
import Select from 'react-select'

export type FormValues = {
    name: string
    password: string
    email: string
    options: []
    role: { label: string; value: string }
}

const options = [
    { value: 'inspector', label: 'inspector' },
    { value: 'leader', label: 'leader' },
]

export const AddUser = () => {
    const {
        handleSubmit,
        formState: { errors },
        control,
        register,
        reset,
    } = useForm<FormValues>()

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data)
    }

    return (
        <Wrapper>
            <FormWrapper onSubmit={handleSubmit(onSubmit)}>
                <TextField label="Name" id="name" {...register('name')} />
                <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...register('role')}
                            {...field}
                            options={[
                                { value: 'inspector', label: 'inspector' },
                                { value: 'leader', label: 'leader' },
                            ]}
                            placeholder="Test..."
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

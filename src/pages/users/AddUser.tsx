import { Wrapper, FormWrapper } from './styles'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Autocomplete, TextField } from '@equinor/eds-core-react'

export type FormValues = {
    name: string
    password: string
    email: string
    options: []
    role: string
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
    } = useForm<FormValues>()

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data)
    }

    return (
        <Wrapper>
            <FormWrapper onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Name"
                    style={{ height: '80px' }}
                    id="name"
                    {...register('name')}
                />
                <Controller
                    control={control}
                    name="role"
                    render={({ field: { onChange, value } }) => (
                        <Autocomplete
                            onOptionsChange={({ selectedItems }) => {
                                const [selectedItem] = selectedItems
                                selectedItem && onChange(selectedItem.value)
                            }}
                            optionLabel={(option) => option.label}
                            selectedOptions={
                                options?.filter((x) => x.value === value) || []
                            }
                            label="Role"
                            options={options}
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
            </FormWrapper>
        </Wrapper>
    )
}

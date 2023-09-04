import { Controller, useFormContext } from 'react-hook-form'
import Select from 'react-select'
import { useUserContext } from '../../context/userContextProvider'
import { useAddUser } from '../hooks/useAddUser'

export const RoleSelector = () => {
    const { control, setValue } = useFormContext()
    const { user } = useAddUser()
    const { options } = useUserContext()

    const currentDefaultValue = options.find(
        (option) => option.label === user?.userRole.name
    )
    return (
        <>
            <Controller
                control={control}
                name="userRoleId"
                rules={{
                    required: 'Required',
                }}
                defaultValue={currentDefaultValue}
                render={({ field: { onChange, value } }) => {
                    if (!value && currentDefaultValue) {
                        setValue('userRoleId', currentDefaultValue.value)
                    }

                    return (
                        <Select
                            placeholder={user?.userRole.name}
                            options={options}
                            value={options.find((c) => c.value === value)}
                            onChange={(val) => {
                                onChange(val?.value)
                            }}
                        />
                    )
                }}
            />
        </>
    )
}

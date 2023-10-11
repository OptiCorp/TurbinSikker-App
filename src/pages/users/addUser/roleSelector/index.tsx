import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import Select from 'react-select'
import apiService from '../../../../services/api'
import { UserRole } from '../../../../services/apiTypes'
import { useAddUser } from '../../hooks/useAddUser'

export const RoleSelector = () => {
    const api = apiService()
    const { control, setValue } = useFormContext()
    const { user } = useAddUser()
    const [userRoles, setUserRoles] = useState<UserRole[]>()

    useEffect(() => {
        ;(async () => {
            const userRolesFromApi = await api.getAllUserRoles()
            setUserRoles(userRolesFromApi)
        })()
    }, [])

    const currentDefaultValue = userRoles?.find(
        (role) => role.name === user?.userRole.name
    )
    const options = userRoles?.map(
        ({ id, name }: { id: string; name: string }) => ({
            value: id,
            label: name,
        })
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
                        setValue('userRoleId', currentDefaultValue.name)
                    }

                    return (
                        <Select
                            placeholder={user?.userRole.name}
                            options={options}
                            value={options?.find((c) => c.value === value)}
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

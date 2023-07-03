import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import Select from 'react-select'
import { Option } from '../types'

export const RoleSelector = () => {
    const { control } = useFormContext()

    const [options, setOptions] = useState<Option[]>([])

    useEffect(() => {
        const fetchUserRoles = async () => {
            const res = await fetch(
                'http://20.251.37.226:8080/api/GetAllUserRoles'
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
        <>
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
        </>
    )
}

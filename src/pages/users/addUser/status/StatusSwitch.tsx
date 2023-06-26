import { Switch } from '@equinor/eds-core-react'
import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useAddUser } from '../hooks/useAddUser'

export const StatusSwitch = () => {
    const { control, register } = useFormContext()
    const { user } = useAddUser()
    const [checked, setChecked] = useState(user?.status === 0)

    useEffect(() => {
        setChecked(user?.status === 0)
    }, [user])

    return (
        <>
            <Controller
                control={control}
                name="status"
                rules={{
                    required: 'Required',
                }}
                defaultValue={user?.status}
                render={({ field: { onChange, value } }) => (
                    <Switch
                        type="checkbox"
                        value={value}
                        {...register(String(user?.status))}
                        checked={checked}
                        onChange={(e) => {
                            setChecked(e.target.checked)
                            onChange(e.target.checked ? 0 : 1)
                        }}
                        label={`User is ${checked ? 'active' : 'inactive'}`}
                    />
                )}
            />
        </>
    )
}

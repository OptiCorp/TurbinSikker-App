import { Switch } from '@equinor/eds-core-react'
import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useAddUser } from '../hooks/useAddUser'
import { Chip } from '@equinor/eds-core-react'

export const StatusSwitch = () => {
    const { control, register } = useFormContext()
    const { user } = useAddUser()
    const [checked, setChecked] = useState(user?.status === 'Active')

    useEffect(() => {
        setChecked(user?.status === 'Active')
    }, [user])

    return (
        <>
            <Chip
                variant={checked ? 'active' : 'error'}
                style={{ display: 'flex', width: '200px', height: '20px' }}
            >
                <Controller
                    control={control}
                    name="status"
                    rules={{
                        required: 'Required',
                    }}
                    defaultValue={user?.status}
                    render={({ field: { onChange, value } }) => (
                        <Switch
                            size="small"
                            type="checkbox"
                            value={value}
                            {...register(String(user?.status))}
                            checked={checked}
                            onChange={(e) => {
                                setChecked(e.target.checked)
                                onChange(
                                    e.target.checked ? 'Active' : 'Disabled'
                                )
                            }}
                            label={`User is ${checked ? 'Active' : 'Disabled'}`}
                        />
                    )}
                />
            </Chip>
        </>
    )
}

import { Typography } from '@equinor/eds-core-react'
import { Controller, useFormContext } from 'react-hook-form'
import Select from 'react-select'

import { useEffect, useState } from 'react'
import apiService from '../../../services/api'
import { User } from '../../../services/apiTypes'
import { useAddWorkFlowForm } from './hooks/useAddWorkFlowForm'
import { Bar, FormContainer, RecipientsContainer, SendBox } from './styles'

export const SelectComponent = () => {
    const { control, register } = useFormContext()
    const { list } = useAddWorkFlowForm()
    const api = apiService()
    const [userList, setUserList] = useState<User[]>([])

    useEffect(() => {
        ;(async () => {
            const users = await api.getAllUsersAdmin()
            setUserList(users)
        })()
    }, [])

    const options = userList?.map(
        ({ id, username }: { id: string; username: string }) => ({
            value: id,
            label: username,
        })
    )

    return (
        <>
            <SendBox>
                <Bar>
                    <Typography
                        variant="body_short_bold"
                        token={{
                            textAlign: 'center',
                            fontSize: '1.4rem',
                            color: 'white',
                        }}
                    >
                        Choose checklist
                    </Typography>
                </Bar>
                <FormContainer>
                    <Controller
                        control={control}
                        name="checklistId"
                        rules={{
                            required: 'Required',
                        }}
                        defaultValue={list[0]}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                options={list}
                                value={list.find((c) => c.id === value)}
                                onChange={(val) => onChange(val?.value)}
                            />
                        )}
                    />
                </FormContainer>

                <Bar>
                    <Typography
                        variant="body_short_bold"
                        token={{
                            textAlign: 'center',
                            fontSize: '1.4rem',
                            color: 'white',
                        }}
                    >
                        Choose recipients
                    </Typography>
                </Bar>
                <RecipientsContainer>
                    <Controller
                        control={control}
                        name="userIds"
                        rules={{
                            required: 'Required',
                        }}
                        defaultValue={options[0]}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                options={options}
                                isMulti={true}
                                value={options.find(
                                    (c: { value: string }) => c.value === value
                                )}
                                onChange={(val) =>
                                    onChange(val.map((x) => x.value))
                                }
                            />
                        )}
                    />
                </RecipientsContainer>
            </SendBox>
        </>
    )
}

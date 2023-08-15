import { Typography } from '@equinor/eds-core-react'
import { useContext } from 'react'
import { Controller, useForm, useFormContext } from 'react-hook-form'
import Select from 'react-select'

import { ApiContext } from '../../context/apiContextProvider'
import { Bar, FormContainer, RecipientsContainer, SendBox } from './styles'

export const SelectComponent = () => {
    const { list, userList } = useContext(ApiContext)

    const { control } = useForm()

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
                        name="Checklist"
                        rules={{
                            required: 'Required',
                        }}
                        defaultValue={list[0]}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                options={list}
                                value={list.find((c) => c.value === value)}
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
                        name="userList"
                        rules={{
                            required: 'Required',
                        }}
                        defaultValue={userList[0]}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                options={userList}
                                isMulti={true}
                                value={userList.find((c) => c.value === value)}
                                onChange={(val) => onChange(val)}
                            />
                        )}
                    />
                </RecipientsContainer>
            </SendBox>
        </>
    )
}
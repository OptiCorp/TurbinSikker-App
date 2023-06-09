import { FunctionComponent, useEffect, useState } from 'react'

import { Button, Table, Typography } from '@equinor/eds-core-react'
import { Icon } from '@equinor/eds-core-react'
import { edit } from '@equinor/eds-icons'
import { TableData, StyledTable, ListWrapper, Test, StyledHead } from './styles'
import { Link } from 'react-router-dom'
import { RouteName } from '../../../components/sidebar/styles'

export type IUser = {
    email: string
    first_name: string
    last_name: string
    id: string
    role_id: string
    username: string
}

interface Data {
    data: any[]
    isLoading: boolean
}

export const ListUsers = () => {
    const [result, setResult] = useState<IUser[]>([
        {
            first_name: 'first_name',
            last_name: 'last_name',
            role_id: 'role_id',

            email: 'email',
            id: 'id',
            username: 'username',
        },
    ])

    useEffect(() => {
        fetch('https://localhost:7290/User')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed with HTTP code ' + response.status)
                }
                return response
            })
            .then((response) => response.json())
            .then((data) => {
                setResult(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const user = result.map((item) => {
        return (
            <Table.Row>
                <Test>
                    {item.first_name} {item.last_name}
                    <Test>
                        {' '}
                        <TableData> {item.email}</TableData>
                    </Test>
                </Test>

                <Test>{item.role_id}</Test>
                <Test>
                    <Icon data={edit} />
                </Test>
            </Table.Row>
        )
    })

    return (
        <ListWrapper>
            <StyledTable>
                <Table.Caption></Table.Caption>
                <StyledHead sticky>
                    <Table.Row>
                        <Table.Cell>Name/Email</Table.Cell>

                        <Table.Cell>Role</Table.Cell>
                    </Table.Row>
                </StyledHead>
                <Table.Body>{user} </Table.Body>
            </StyledTable>{' '}
            <Button
                style={{
                    maxHeight: '30px',
                    width: '30%',
                    marginBottom: '100px',
                }}
                as={Link}
                to="/AddUser"
            >
                AddUser
            </Button>
        </ListWrapper>
    )
}

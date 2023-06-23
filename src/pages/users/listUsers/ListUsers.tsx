import { useContext } from 'react'

import { Button, Table } from '@equinor/eds-core-react'
import {
    StyledTable,
    ListWrapper,
    StyledTableCell,
    StyledHead,
    ContainerForm,
} from './styles'
import { Link } from 'react-router-dom'
import { ApiContext } from '../context/apiContextProvider'
import { UserRow } from './userRow'

export const ListUsers = () => {
    const { result: users } = useContext(ApiContext)

    return (
        <ListWrapper>
            <ContainerForm>
                <StyledTable>
                    <Table.Caption></Table.Caption>
                    <StyledHead sticky>
                        <Table.Row>
                            <StyledTableCell>Name</StyledTableCell>

                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Role</StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                        </Table.Row>
                    </StyledHead>

                    <Table.Body>
                        {users.map((user) => (
                            <UserRow user={user} />
                        ))}
                    </Table.Body>
                </StyledTable>{' '}
            </ContainerForm>
            <Button
                style={{
                    maxHeight: '30px',
                    width: '30%',
                    marginTop: '2rem',
                }}
                as={Link}
                to="/AddUser/"
            >
                AddUser
            </Button>
        </ListWrapper>
    )
}

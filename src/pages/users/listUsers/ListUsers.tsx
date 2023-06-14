import { useContext } from 'react'

import { Button, Table } from '@equinor/eds-core-react'
import { Icon } from '@equinor/eds-core-react'
import { edit } from '@equinor/eds-icons'
import {
    TableData,
    StyledTable,
    ListWrapper,
    StyledTableCell,
    StyledHead,
    ContainerForm,
} from './styles'
import { Link, useNavigate } from 'react-router-dom'
import { ApiContext } from '../context/apiContextProvider'

export const ListUsers = () => {
    const { result } = useContext(ApiContext)
    const navigate = useNavigate()
    const clickHandler = () => {
        navigate('/EditUser')
    }

    const user = result.map((item, myKey) => {
        return (
            <Table.Row key={myKey}>
                <StyledTableCell>
                    {item.first_name} {item.last_name}
                </StyledTableCell>
                <StyledTableCell>
                    <TableData>{item.email}</TableData>
                </StyledTableCell>

                <StyledTableCell>{item.role_id}</StyledTableCell>
                <StyledTableCell>
                    <Icon
                        data={edit}
                        size={16}
                        color="#007079"
                        onClick={clickHandler}
                    />
                </StyledTableCell>
            </Table.Row>
        )
    })

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

                    <Table.Body>{user}</Table.Body>
                </StyledTable>{' '}
            </ContainerForm>
            <Button
                style={{
                    maxHeight: '30px',
                    width: '30%',
                    margin: '2rem',
                }}
                as={Link}
                to="/AddUser"
            >
                AddUser
            </Button>
        </ListWrapper>
    )
}

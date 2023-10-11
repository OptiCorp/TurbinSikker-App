import { useEffect, useState } from 'react'
import { Button, Table } from '@equinor/eds-core-react'
import { Link } from 'react-router-dom'
import { CellSize, ContainerForm, ListWrapper, StyledTable, StyledTableCell } from './styles'
import { UserRow } from './userRow'
import { Icon } from '@equinor/eds-core-react'
import { visibility, visibility_off } from '@equinor/eds-icons'
import { DefaultNavigation } from '../../../components/navigation/hooks/DefaultNavigation'
import { useHasPermission } from '../hooks/useHasPermission'
import { User } from '../../../services/apiTypes'
import apiService from '../../../services/api'

export const ListUsers = () => {
    const api = apiService()
    const [users, setUsers] = useState<User[]>()
    const [showInactiveUsers, setShowInactiveUsers] = useState(false)

    useEffect(() => {
        ;(async () => {
            const usersFromApi = await api.getAllUsersAdmin()
            setUsers(usersFromApi)
        })()
    }, [])

    const handleClick = () => {
        setShowInactiveUsers(!showInactiveUsers)
    }

    const filteredUsers = showInactiveUsers
        ? users
        : users?.filter((user) => user.status === 'Active')
    const { hasPermission } = useHasPermission()

    return (
        <ListWrapper>
            <ContainerForm>
                <StyledTable>
                    <Table.Head sticky>
                        <Table.Row>
                            <StyledTableCell>
                                <CellSize>
                                    Name /<div>Email</div>
                                </CellSize>
                            </StyledTableCell>

                            <StyledTableCell>
                                <CellSize>Role</CellSize>
                            </StyledTableCell>
                            <StyledTableCell>
                                <CellSize>
                                    {!hasPermission ? (
                                        <p>Status</p>
                                    ) : (
                                        <Button
                                            style={{
                                                margin: '0 auto',
                                                width: '80px',
                                                height: '25px',

                                                fontSize: '0.7rem',
                                            }}
                                            onClick={handleClick}
                                        >
                                            Status
                                            {showInactiveUsers ? (
                                                <Icon
                                                    size={16}
                                                    data={visibility}
                                                    onClick={handleClick}
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                />
                                            ) : (
                                                <Icon
                                                    size={16}
                                                    data={visibility_off}
                                                    onClick={handleClick}
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                />
                                            )}
                                        </Button>
                                    )}
                                </CellSize>
                            </StyledTableCell>
                            <StyledTableCell> </StyledTableCell>
                        </Table.Row>
                    </Table.Head>

                    <Table.Body>
                        {filteredUsers?.map((user) => <UserRow user={user} key={user.id} />)}
                    </Table.Body>
                </StyledTable>{' '}
            </ContainerForm>
            {!hasPermission ? null : (
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
            )}
            <DefaultNavigation hideNavbar={false} />
        </ListWrapper>
    )
}

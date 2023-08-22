import { Chip, Icon, Table } from '@equinor/eds-core-react'
import { edit } from '@equinor/eds-icons'
import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router'
import { UserEntity } from 'src/pages/users/context/models/UserEntity'
import { IUser } from '../../addUser/hooks/useAddUser/types'
import { useHasPermission } from '../../hooks/useHasPermission'
import { StyledTableCell, TableData } from '../styles'
interface UserRowProps {
    user: IUser
}

export const UserRow: FunctionComponent<UserRowProps> = ({ user }) => {
    const navigate = useNavigate()
    const { hasPermission } = useHasPermission()

    const clickHandler = (id: string) => {
        if (!hasPermission) {
            navigate(`/User/${id}`)
        } else {
            navigate(`/EditUser/${id}`)
        }
    }

    return (
        <Table.Row onClick={() => clickHandler(user.id)}>
            <StyledTableCell>
                <p
                    style={{
                        fontWeight: 'bold',

                        margin: '0 auto',
                    }}
                >
                    {user.firstName} {user.lastName}
                </p>
                <TableData>{user.email}</TableData>
            </StyledTableCell>

            <StyledTableCell>{user.userRole.name}</StyledTableCell>
            <StyledTableCell>
                {user.status === 'Active' ? (
                    <Chip variant="active" style={{ margin: '0 auto' }}>
                        active
                    </Chip>
                ) : (
                    <Chip variant="error" style={{ margin: '0 auto' }}>
                        inactive
                    </Chip>
                )}
            </StyledTableCell>
            <StyledTableCell>
                <Icon
                    data={edit}
                    size={16}
                    color="#007079"
                    onClick={() => clickHandler(user.id)}
                />
            </StyledTableCell>
        </Table.Row>
    )
}

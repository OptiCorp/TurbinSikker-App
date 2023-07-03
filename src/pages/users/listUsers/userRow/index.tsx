import { FunctionComponent } from 'react'
import { IUser } from '../../../context/apiContextProvider'
import { Table, Icon } from '@equinor/eds-core-react'
import { edit } from '@equinor/eds-icons'
import { StyledTableCell, TableData } from '../styles'
import { useNavigate } from 'react-router'
import { Chip } from '@equinor/eds-core-react'
interface UserRowProps {
    user: IUser
}

export const UserRow: FunctionComponent<UserRowProps> = ({ user }) => {
    const navigate = useNavigate()

    const clickHandler = (id: string) => {
        navigate(`/EditUser/${id}`)
    }

    return (
        <Table.Row>
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

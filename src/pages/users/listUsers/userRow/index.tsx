import { FunctionComponent } from 'react'
import { IUser } from '../../context/apiContextProvider'
import { Table, Icon } from '@equinor/eds-core-react'
import { edit } from '@equinor/eds-icons'
import { StyledTableCell, TableData } from '../styles'
import { useNavigate } from 'react-router'

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
                {user.firstName} {user.lastName}
            </StyledTableCell>
            <StyledTableCell>
                <TableData>{user.email}</TableData>
            </StyledTableCell>

            <StyledTableCell>{user.userRoleId}</StyledTableCell>
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

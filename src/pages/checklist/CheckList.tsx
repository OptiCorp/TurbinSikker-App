import { useContext } from 'react'
import { Table } from '@equinor/eds-core-react'
import { ApiContext } from '../users/context/apiContextProvider'
import { CheckListUserRow } from './CheckListRowAll'
import { ListWrapperCheckL } from './styles'

export const CheckList = () => {
    const { allCheckList } = useContext(ApiContext)

    return (
        <>
            <ListWrapperCheckL>
                <Table>
                    <Table.Head>
                        <Table.Row>
                            <Table.Cell>Name</Table.Cell>
                            <Table.Cell>Send in by</Table.Cell>
                            <Table.Cell>Date issued</Table.Cell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {allCheckList?.map((allCheckList) => (
                            <CheckListUserRow
                                allCheckList={allCheckList}
                                key={allCheckList.id}
                            />
                        ))}
                    </Table.Body>
                </Table>
            </ListWrapperCheckL>
        </>
    )
}

import { NavActionsComponent } from '@components/navigation/hooks/useNavActionBtn'
import { Table } from '@equinor/eds-core-react'
import { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { ApiContext } from '../../context/apiContextProvider'
import { CheckListUserIDRow } from './CheckListIDrow'
import { ModalMyCheckList } from './ModalMyCheckList'
import {
    BackgroundWrap,
    HeadCell,
    ListWrapperCheckMyList,
    Styledh3,
} from './styles'

export const MyCheckLists = () => {
    const clickHandler = () => {
        navigate(`/SendCheckList`)
    }

    const navigate = useNavigate()
    const handleClose = () => {
        setIsOpen(false)
    }
    const [isOpen, setIsOpen] = useState(false)
    const { userIdCheckList } = useContext(ApiContext)
    const location = useLocation()
    const [activeRow, setActiveRow] = useState(false)
    return (
        <>
            <BackgroundWrap>
                <ListWrapperCheckMyList>
                    <Table>
                        <Table.Head sticky>
                            <Table.Row>
                                <HeadCell>
                                    <Styledh3>Name</Styledh3>
                                </HeadCell>
                                <HeadCell>
                                    <Styledh3>Status</Styledh3>
                                </HeadCell>
                                <HeadCell>
                                    <Styledh3>Last Update</Styledh3>
                                </HeadCell>
                            </Table.Row>
                        </Table.Head>

                        <Table.Body>
                            {userIdCheckList?.map((userIdCheckList) => (
                                <CheckListUserIDRow
                                    userIdCheckList={userIdCheckList}
                                    key={userIdCheckList.id}
                                    setActiveRow={setActiveRow}
                                    activeRow={activeRow}
                                />
                            ))}
                        </Table.Body>
                    </Table>
                </ListWrapperCheckMyList>
            </BackgroundWrap>
            {activeRow === true ? (
                <NavActionsComponent
                    buttonColor="danger"
                    onClick={() => {
                        setIsOpen(true)
                    }}
                    ButtonMessage="Delete Checklist"
                    secondButtonVariant="outlined"
                    secondOnClick={handleClose}
                    SecondButtonMessage="Cancel"
                    isShown={true}
                />
            ) : (
                <NavActionsComponent
                    buttonVariant="outlined"
                    onClick={() => {
                        setIsOpen(true)
                    }}
                    ButtonMessage="New Checklist"
                    secondButtonColor="primary"
                    secondOnClick={() => {
                        navigate(`/SendCheckList/`)
                    }}
                    isShown={true}
                    SecondButtonMessage="Send Checklist"
                    as="a"
                    href="/SendCheckList/"
                />
            )}

            <ModalMyCheckList
                handleClose={handleClose}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </>
    )
}

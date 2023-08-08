import { FooterContainer } from '@components/navigation/styles'
import { SnackbarContext } from '@components/snackbar/SnackBarContext'
import { Button, Dialog } from '@equinor/eds-core-react'

import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApiContext } from '../../../pages/context/apiContextProvider'
import useAuth from '../../../pages/landingPage/context/LandingPageContextProvider'
import { BtnWrapper } from '../../users/addUser/styles'
import { ButtonWrap, MakeTitleField, StyledDialog } from './styles'

import { Link } from 'react-router-dom'

type Props = {
    activeRow: boolean
}

export const MyCheckListNav = ({ activeRow }: Props) => {
    const { idToken } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const handleClose = () => {
        setIsOpen(false)
    }
    const [title, setTitle] = useState('')
    const navigate = useNavigate()

    const { setRefreshList } = useApiContext()
    const { openSnackbar } = useContext(SnackbarContext)

    const handleSubmit = async (data: { title: string }) => {
        const res = await fetch(`http://20.251.37.226:8080/api/AddChecklist`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${idToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: data.title,
                CreatedBy: '55ba8118-5880-4abf-afb4-44bbb7ac1a4c',
            }),
        })

        if (res.ok) {
            const responseJson = await res.json()
            if (responseJson && responseJson.id) {
                const checklistId = responseJson.id
                navigate(`/EditCheckList/${checklistId}`)
            }
            setRefreshList((prev) => !prev)
        }

        setIsOpen(false)
        if (openSnackbar) {
            openSnackbar(`CheckList Created`)
        }
    }

    return (
        <>
            <FooterContainer>
                {activeRow === true ? (
                    <BtnWrapper>
                        <Button
                            color="danger"
                            onClick={() => {
                                setIsOpen(true)
                            }}
                        >
                            Delete CheckList
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleClose}
                            style={{ width: '8rem', color: 'white' }}
                        >
                            Cancel
                        </Button>
                    </BtnWrapper>
                ) : (
                    <BtnWrapper>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setIsOpen(true)
                            }}
                            style={{ color: 'white', borderColor: 'white' }}
                        >
                            New CheckList
                        </Button>

                        <Button color="primary" as={Link} to="/SendCheckList">
                            Send CheckList
                        </Button>
                    </BtnWrapper>
                )}

                <div>
                    <Dialog open={isOpen}>
                        <>
                            <Dialog.Header>
                                <Dialog.Title>Title of CheckList</Dialog.Title>
                            </Dialog.Header>
                            <StyledDialog>
                                <MakeTitleField
                                    id="storybook-readonly"
                                    placeholder="name"
                                    label=""
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setTitle(event.target.value)
                                    }}
                                    style={{
                                        borderBottom: '1px solid #243746',
                                        background: '#F7F7F7',
                                    }}
                                />
                            </StyledDialog>{' '}
                        </>

                        <Dialog.Actions>
                            <ButtonWrap>
                                <Button variant="ghost" onClick={handleClose}>
                                    Cancel
                                </Button>

                                <Button
                                    onClick={() => {
                                        handleSubmit({
                                            title,
                                        })
                                    }}
                                >
                                    Save
                                </Button>
                            </ButtonWrap>
                        </Dialog.Actions>
                    </Dialog>
                </div>
            </FooterContainer>
        </>
    )
}

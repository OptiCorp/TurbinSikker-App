import { FooterContainer } from '@components/navigation/styles'
import { SnackbarContext } from '@components/snackbar/SnackBarContext'
import { Button, Dialog, TextField } from '@equinor/eds-core-react'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApiContext } from '../../../pages/context/apiContextProvider'
import useAuth from '../../../pages/landingPage/context/LandingPageContextProvider'
import { BtnWrapper } from '../../users/addUser/styles'

export const MyCheckListNav = () => {
    const { idToken } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const handleClose = () => {
        setIsOpen(false)
    }
    const [title, setTitle] = useState('')
    const navigate = useNavigate()
    const { refreshList, setRefreshList } = useApiContext()
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
                CreatedBy: '3dc14bce-7e99-4a9f-a8e7-83febaefc64b',
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

                    <div>
                        <Button color="primary">Send CheckList</Button>
                    </div>
                </BtnWrapper>
                <div>
                    {' '}
                    <Dialog open={isOpen}>
                        <Dialog.Header>
                            <Dialog.Title>Text + actions</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Actions>
                            <div>
                                <TextField
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
                            </div>
                        </Dialog.Actions>
                    </Dialog>
                </div>
            </FooterContainer>
        </>
    )
}

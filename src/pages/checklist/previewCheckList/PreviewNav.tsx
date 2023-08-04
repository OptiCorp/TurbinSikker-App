import { useAddTaskForm } from '@components/addtasks/useAddTaskForm'
import { FooterContainer } from '@components/navigation/styles'
import { Button } from '@equinor/eds-core-react'

import { useNavigate } from 'react-router'
import { BtnWrapper } from '../../users/addUser/styles'

export const PreviewNav = () => {
    const navigate = useNavigate()
    const { checkListId } = useAddTaskForm()
    const clickHandler = (id: string) => {
        navigate(`/EditCheckList/${id}`)
    }

    return (
        <>
            <FooterContainer>
                {checkListId && (
                    <BtnWrapper>
                        <Button
                            color="secondary"
                            onClick={() => clickHandler(checkListId.id)}
                        >
                            Edit CheckList
                        </Button>

                        <div>
                            <Button>Send</Button>
                        </div>
                    </BtnWrapper>
                )}
            </FooterContainer>
        </>
    )
}

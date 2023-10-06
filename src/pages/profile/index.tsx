import React, { FunctionComponent, useState } from 'react'

import { Button, Typography } from '@equinor/eds-core-react'
import {
    ContainerIcon,
    Image,
    ImageContainer,
    Info,
    Placeholder,
    Wrapper,
} from './styles'

import { Icon } from '@equinor/eds-core-react'
import { add, edit } from '@equinor/eds-icons'

import { useMsal } from '@azure/msal-react'
import { DefaultNavigation } from '../../components/navigation/hooks/DefaultNavigation'
import useGlobal from '../../context/globalContextProvider'


export const Profile: FunctionComponent = () => {
    const [state, setstate] = useState('')
    const { instance } = useMsal()
    const handleSubmit = () => {
        instance.logoutPopup()
    }
    const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setstate(URL.createObjectURL(event.target.files[0]))
            console.log(URL.createObjectURL(event.target.files[0]))
        }
    }
    const { currentUser } = useGlobal()
console.log(currentUser)
    return (
        <>
            <Wrapper>
                <ImageContainer>
                    {state ? (
                        <img
                            src={state ? state : Image}
                            className={Image}
                            id="output"
                            width="150"
                            height="150"
                            alt="test"
                            style={{ borderRadius: '50%' }}
                        />
                    ) : (
                        <Placeholder
                            style={{ display: state ? 'null' : 'block' }}
                        />
                    )}
                    <label htmlFor="file" style={{ cursor: 'pointer' }}>
                        <ContainerIcon>
                            <Icon
                                data={state ? edit : add}
                                size={24}
                                style={{
                                    color: 'white',
                                }}
                            />
                        </ContainerIcon>
                    </label>{' '}
                </ImageContainer>
                <input
                    type="file"
                    accept="image/*"
                    name="image"
                    id="file"
                    onChange={loadFile}
                    style={{ display: 'none' }}
                />
                {!currentUser ? (
                    <Info>
                        <p>Loading user info..</p>
                    </Info>
                ) : (
                    <Info>
                        <Typography variant="h5">
                            {currentUser?.firstName} {currentUser?.lastName}
                        </Typography>
                        <Typography variant="body_short">
                            {currentUser?.userRole.name}
                        </Typography>
                    </Info>
                )}
                <Button color="secondary" onClick={handleSubmit}>
                    Sign Out
                </Button>
            </Wrapper>
            <DefaultNavigation hideNavbar={false} />
        </>
    )
}

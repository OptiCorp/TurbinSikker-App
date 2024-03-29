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
import { COLORS } from '../../style/GlobalStyles'

export const Profile: FunctionComponent = () => {
    const [state, setstate] = useState('')
    const { instance } = useMsal()
    const handleSubmit = () => {
        instance.logoutPopup()
    }
    const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setstate(URL.createObjectURL(event.target.files[0]))
        }
    }
    const { currentUser } = useGlobal()
    const { accounts } = useMsal()

    return (
        <>
            <Wrapper>
                <ImageContainer>
                    {state ? (
                        <Image state={state} />
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
                                    color: COLORS.white,
                                }}
                            />
                        </ContainerIcon>
                    </label>
                </ImageContainer>
                <input
                    type="file"
                    accept="image/*"
                    name="image"
                    id="file"
                    onChange={loadFile}
                    style={{ display: 'none' }}
                />
                {!currentUser?.username ? (
                    <Info>
                        <p>Loading user info..</p>
                    </Info>
                ) : (
                    <Info>
                        <Typography variant="h5">{accounts[0].name}</Typography>

                        <Typography variant="body_short">
                            {' '}
                            {currentUser?.userRole}
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

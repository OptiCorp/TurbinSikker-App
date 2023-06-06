import React, { FunctionComponent } from 'react'
import { useState } from 'react'

import { Button, Typography } from '@equinor/eds-core-react'
import { Wrapper, ImageContainer, Info } from './styles'
import styled from 'styled-components'
import { Icon } from '@equinor/eds-core-react'
import { add, edit } from '@equinor/eds-icons'

import { useMsal } from '@azure/msal-react'
import useAuth from '../landingPage/context/LandingPageContextProvider'

const Image = styled.image`
    border-radius: 50%;
`

const Placeholder = styled.div`
    background: #d9d9d9;
    width: 150px;
    height: 150px;
    border-radius: 50%;
`

const ContainerIcon = styled.div`
    background: #007079;
    border-radius: 50%;
    padding: 5px;
    display: flex;

    margin: 0 auto;
`

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

    const { account } = useAuth()

    return (
        <>
            <Wrapper>
                <h1>Profile </h1>
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
                <Info>
                    <Typography variant="h5">{account.name}</Typography>

                    <Typography variant="body_short">Inspector</Typography>
                </Info>
                <Button color="secondary" onClick={handleSubmit}>
                    Sign Out
                </Button>
            </Wrapper>
        </>
    )
}

import React from 'react'
import { useState } from 'react'

import { Typography } from '@equinor/eds-core-react'
import { Wrapper, ImageContainer, Info } from './styles'
import styled from 'styled-components'
import { Icon } from '@equinor/eds-core-react'
import { add_circle_filled } from '@equinor/eds-icons'

const Image = styled.image`
    border-radius: 50%;
`

export const Profile = () => {
    const [state, setstate] = useState('')

    var loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setstate(URL.createObjectURL(event.target.files[0]))
            console.log(URL.createObjectURL(event.target.files[0]))
        }
    }

    return (
        <>
            <Wrapper>
                <h1>Profile </h1>
                <ImageContainer>
                    <img
                        src={state ? state : Image}
                        className={Image}
                        id="output"
                        width="150"
                        height="150"
                        alt="test"
                        style={{ borderRadius: '50%' }}
                    />{' '}
                    <label htmlFor="file" style={{ cursor: 'pointer' }}>
                        <Icon
                            data={add_circle_filled}
                            size={40}
                            style={{
                                color: '#73B1B5',
                            }}
                        />
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
                    <Typography variant="h5">Roger Hellesen</Typography>
                    <Typography variant="body_short">Inspector</Typography>
                </Info>
            </Wrapper>
        </>
    )
}

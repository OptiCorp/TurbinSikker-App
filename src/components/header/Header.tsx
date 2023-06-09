import { TopBar } from '@equinor/eds-core-react'
import { useNavigate } from 'react-router'
import { arrow_back_ios } from '@equinor/eds-icons'
import { Icon } from '@equinor/eds-core-react'
import React from 'react'
import logo from '../../assets/images/smallLogo.png'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

const NewTopBar = styled(TopBar)`
    background: #243746;
`

export const Header = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const onClick = () => {
        navigate('/')
    }

    return (
        <NewTopBar>
            <TopBar.Header>
                <React.Fragment key=".0">
                    {location.pathname === '/profile' ? (
                        <Icon
                            data={arrow_back_ios}
                            color="white"
                            onClick={onClick}
                        >
                            {' '}
                        </Icon>
                    ) : null}
                </React.Fragment>
            </TopBar.Header>

            <TopBar.Actions>
                <img src={logo} />
            </TopBar.Actions>
        </NewTopBar>
    )
}

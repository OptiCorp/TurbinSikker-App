import { TopBar } from '@equinor/eds-core-react'
import { useLocation, useNavigate } from 'react-router'
import { arrow_back_ios } from '@equinor/eds-icons'
import { Icon } from '@equinor/eds-core-react'
import { useEffect, useState } from 'react'
import logo from '../../assets/images/smallLogo.png'
import styled from 'styled-components'

const NewTopBar = styled(TopBar)`
    background: #243746;
`

export const HeaderContents = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
`

export const HeaderLocation = styled.p`
    margin: 0 auto;
    grid-column: 3/3;
    font-size: 1rem;
    color: white;
`

export const Header = () => {
    const navigate = useNavigate()
    const appLocation = useLocation()
    const onClick = () => {
        navigate(-1)
    }

    const homeClick = () => {
        navigate('/')
    }
    const [activeUrl, setActiveUrl] = useState<string>('')

    useEffect(() => {
        setActiveUrl(window.location.pathname)
    }, [appLocation])

    return (
        <NewTopBar>
            <TopBar.Header>
                {activeUrl === '/' ? null : (
                    <HeaderContents>
                        <Icon
                            data={arrow_back_ios}
                            color="white"
                            onClick={onClick}
                        />
                        <HeaderLocation>
                            {location.pathname.slice(1)}
                        </HeaderLocation>
                    </HeaderContents>
                )}
            </TopBar.Header>

            <TopBar.Actions>
                <img src={logo} onClick={homeClick} />
            </TopBar.Actions>
        </NewTopBar>
    )
}

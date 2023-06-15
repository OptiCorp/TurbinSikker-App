import { TopBar } from '@equinor/eds-core-react'
import { useLocation, useNavigate, useParams } from 'react-router'
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
    const [activeUrl, setActiveUrl] = useState<string>('')

    useEffect(() => {
        setActiveUrl(window.location.pathname)
    }, [appLocation])

    const useBasePath = () => {
        const location = useLocation()
        const params = useParams<Record<string, string>>()

        return Object.values(params).reduce(
            (path, param) => path.replace('/' + param, ''),
            location.pathname.slice(1)
        )
    }
    const basePath = useBasePath()

    const onClick = () => {
        navigate(-1)
    }

    const homeClick = () => {
        navigate('/')
    }

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
                            {basePath}{' '}
                            {/* {location.pathname === '/Adduser'
                                ? location.pathname.slice(2)
                                : null} */}
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

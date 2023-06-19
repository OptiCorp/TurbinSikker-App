import { TopBar } from '@equinor/eds-core-react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { arrow_back_ios } from '@equinor/eds-icons'
import { Icon } from '@equinor/eds-core-react'
import { useEffect, useState } from 'react'
import logo from '../../assets/images/smallLogo.png'
import { NewTopBar, HeaderContents, HeaderLocation } from './styles'

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
                    </HeaderContents>
                )}
            </TopBar.Header>
            <TopBar.CustomContent>
                {' '}
                <HeaderLocation>
                    {location.pathname === '/AddUser/'
                        ? location.pathname.slice(1, -1)
                        : basePath}
                </HeaderLocation>{' '}
            </TopBar.CustomContent>
            <TopBar.Actions>
                <img src={logo} onClick={homeClick} />
            </TopBar.Actions>
        </NewTopBar>
    )
}

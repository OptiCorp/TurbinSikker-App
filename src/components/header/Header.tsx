import { useAddTaskForm } from '@components/addtasks/useAddTaskForm'
import { Icon, TopBar } from '@equinor/eds-core-react'
import { arrow_back_ios } from '@equinor/eds-icons'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import logo from '../../assets/images/smallLogo.png'
import { useApiContext } from '../../pages/context/apiContextProvider'
import { HeaderContents, HeaderLocation, NewTopBar } from './styles'

export const Header = () => {
    const { refreshList, setRefreshList } = useApiContext()
    const navigate = useNavigate()
    const appLocation = useLocation()
    const [activeUrl, setActiveUrl] = useState<string>('')
    const {} = useAddTaskForm()
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
        setRefreshList((prev) => !prev)
        console.log(setRefreshList)
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

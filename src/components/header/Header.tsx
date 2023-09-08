import { useAddTaskForm } from '@components/addtasks/hooks/useAddTaskForm'
import { Icon, TopBar } from '@equinor/eds-core-react'
import { arrow_back_ios } from '@equinor/eds-icons'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import logo from '../../assets/images/smallLogo.png'
import { useWorkflowContext } from '../../pages/checklist/workflow/context/workFlowContextProvider'
import { useCheckListContext } from '../../pages/context/CheckListContextProvider'
import { HeaderContents, HeaderLocation, NewTopBar } from './styles'

export const Header = () => {
    const { setRefreshList } = useCheckListContext()
    const navigate = useNavigate()
    const appLocation = useLocation()
    const [activeUrl, setActiveUrl] = useState<string>('')
    const { WorkFlows } = useWorkflowContext()

    const { checkListById } = useAddTaskForm()

    useEffect(() => {
        setActiveUrl(window.location.pathname)
    }, [appLocation])

    const useBasePath = () => {
        const location = useLocation()
        const params = useParams<Record<string, string>>()

        return Object.values(params).reduce(
            (path, param) => path?.replace('/' + param, ''),
            location.pathname.slice(1)
        )
    }
    const basePath = useBasePath()

    const [title, setTitle] = useState('')

    useEffect(() => {
        const workflow = WorkFlows.find(
            (item) => item.checklist.id === checkListById?.id
        )
        let pathTitle = ''
        if (location.pathname.includes('FillOutCheckList') && workflow) {
            pathTitle =
                checkListById?.title + ' ' + workflow.id.slice(10, -18) || ''
        } else if (location.pathname === '/AddUser/') {
            pathTitle = location.pathname.slice(1, -1)
        } else {
            pathTitle = basePath || ''
        }
        setTitle(pathTitle)
    }, [location.pathname, basePath, WorkFlows, checkListById?.id])

    const onClick = () => {
        setRefreshList((prev) => !prev)

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
                <HeaderLocation>{title}</HeaderLocation>
            </TopBar.CustomContent>
            <TopBar.Actions>
                <img src={logo} onClick={homeClick} />
            </TopBar.Actions>
        </NewTopBar>
    )
}

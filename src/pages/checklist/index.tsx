import { useState } from 'react'

import { Tabs } from '@equinor/eds-core-react'
import { Link, Outlet } from 'react-router-dom'
import { useApiContext } from '../context/apiContextProvider'
import { MainWrap, StyledTabh3, TabSubmittedWrap, TabWrap } from './styles'

export const IndexCheckLists = () => {
    const [activeTab, setActiveTab] = useState(1)

    const handleChange = (index: number) => {
        setActiveTab(index)
    }

    const { currentUser } = useApiContext()
    const handleLink = () => {
        if (currentUser?.userRole.name === 'Inspector') {
            return '/InProgress'
        }
    }

    return (
        <MainWrap>
            <Tabs
                variant="minWidth"
                activeTab={activeTab}
                onChange={handleChange}
            >
                <Tabs.List>
                    <TabSubmittedWrap>
                        <Tabs.Tab
                            as={Link}
                            to="/CheckList"
                            style={{
                                borderBottom: 'none',
                            }}
                        >
                            Submitted CheckLists
                        </Tabs.Tab>
                    </TabSubmittedWrap>
                    <TabWrap>
                        <Tabs.Tab
                            as={Link}
                            to="/MyCheckLists"
                            style={{
                                borderBottom: 'none',
                            }}
                        >
                            <StyledTabh3> My CheckLists</StyledTabh3>
                        </Tabs.Tab>
                    </TabWrap>
                </Tabs.List>

                <Outlet />
            </Tabs>
        </MainWrap>
    )
}

import { Tabs } from '@equinor/eds-core-react'
import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useUserContext } from '../users/context/userContextProvider'
import { MainWrap, StyledTabh3, TabSubmittedWrap, TabWrap } from './styles'

const LeaderTabs = () => {
    return (
        <>
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
        </>
    )
}

export const IndexCheckLists = () => {
    const [activeTab, setActiveTab] = useState(1)
    const handleChange = (index: number) => {
        setActiveTab(index)
    }

    // const { currentUser } = useUserContext()

    // const handleLink = () => {
    //     if (currentUser?.userRole.name === 'Inspector') {
    //         return '/InProgress'
    //     }
    // }

    return (
        <MainWrap>
            <Tabs
                variant="minWidth"
                activeTab={activeTab}
                onChange={handleChange}
            >
                <Tabs.List>
                    {/* {currentUser?.userRole.name === 'Leader' ? (
                        <LeaderTabs />
                    ) : ( */}
                        <>
                            <TabSubmittedWrap>
                                <Tabs.Tab
                                    as={Link}
                                    to="/CheckList"
                                    style={{
                                        borderBottom: 'none',
                                    }}
                                >
                                    In progress
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
                                    <StyledTabh3> Pending</StyledTabh3>
                                </Tabs.Tab>
                            </TabWrap>
                        </>
                    {/* )} */}
                </Tabs.List>

                <>
                    <Outlet />
                </>
            </Tabs>
        </MainWrap>
    )
}

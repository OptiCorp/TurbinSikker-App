import { Tabs } from '@equinor/eds-core-react'
import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import useGlobal from '../../context/globalContextProvider'
import { useRoles } from '../../services/useRoles'
import { COLORS } from '../../style/GlobalStyles'
import { MainWrap } from './styles'

export const IndexCheckLists = () => {
    // const [activeTab, setActiveTab] = useState(1)
    // const [activeInspectorTab, setActiveInspectorTab] = useState(0)

    // const handleChange = (index: number) => {
    //     setActiveTab(index)
    // }
    const path = useLocation()
    const { isLeader } = useRoles()
    // const [activeTab, setActiveTab] = useState<number | undefined>(
    //     path.pathname.includes('MyCheckLists')? 0 : 1
    // )
    const [activeTab, setActiveTab] = useState<number | undefined>(
        path.pathname.includes('MyChecklists')
            ? 0
            : path.pathname.includes('Checklists') ||
              path.pathname.includes('/')
            ? 1
            : path.pathname.includes('ForReviewChecklists')
            ? 2
            : 0
    )
    const handleChange = (index: number) => {
        setActiveTab(index)
    }
    const { currentUser, openSnackbar } = useGlobal()
    console.log(activeTab)
    return (
        <>
            {currentUser && (
                <MainWrap>
                    <>
                        <Tabs
                            variant="minWidth"
                            onChange={handleChange}
                            activeTab={activeTab}
                        >
                            <Tabs.List>
                                <Tabs.Tab
                                    as={Link}
                                    to="/MyCheckLists"
                                    style={{
                                        borderBottom: 'none',
                                        borderTopRightRadius: '10px',
                                        borderTopLeftRadius: '10px',
                                        color: COLORS.black,

                                        backgroundColor:
                                            activeTab === 0
                                                ? COLORS.primary
                                                : COLORS.frostyGray,
                                    }}
                                >
                                    <> My checklists</>
                                </Tabs.Tab>
                                <Tabs.Tab
                                    as={Link}
                                    to="/Checklists"
                                    style={{
                                        borderBottom: 'none',
                                        borderTopRightRadius: '10px',
                                        borderTopLeftRadius: '10px',
                                        color: COLORS.black,
                                        backgroundColor:
                                            activeTab === 1
                                                ? COLORS.primary
                                                : COLORS.frostyGray,
                                    }}
                                >
                                    <>In progress</>
                                </Tabs.Tab>
                                {isLeader ? (
                                    <Tabs.Tab
                                        as={Link}
                                        to="/ForReviewChecklists"
                                        style={{
                                            borderBottom: 'none',
                                            borderTopRightRadius: '10px',
                                            borderTopLeftRadius: '10px',
                                            color: COLORS.black,
                                            backgroundColor:
                                                activeTab === 2
                                                    ? COLORS.primary
                                                    : COLORS.frostyGray,
                                        }}
                                    >
                                        For review
                                    </Tabs.Tab>
                                ) : (
                                    <></>
                                )}
                            </Tabs.List>

                            <>
                                <Outlet />
                            </>
                        </Tabs>
                    </>
                </MainWrap>
            )}
        </>
    )
}

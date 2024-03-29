import { Tabs } from '@equinor/eds-core-react'
import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import useSnackBar from '../../components/snackbar/useSnackBar'
import { useRoles } from '../../services/useRoles'
import { COLORS } from '../../style/GlobalStyles'
import { MainWrap } from './styles'
export const IndexCheckLists = () => {
    const path = useLocation()
    const { isLeader, isInspector } = useRoles()

    const [activeTab, setActiveTab] = useState<number | undefined>(
        path.pathname.includes('/') && isInspector
            ? 0
            : path.pathname.includes('/') && isLeader
            ? 1
            : path.pathname.includes('/MyCheckLists')
            ? 0
            : path.pathname.includes('Checklists')
            ? 1
            : path.pathname.includes('ForReviewChecklists')
            ? 2
            : 0
    )
    const handleChange = (index: number) => {
        setActiveTab(index)
    }

    return (
        <>
            <MainWrap>
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
                            <>
                                {' '}
                                {isLeader
                                    ? 'My checklist'
                                    : 'Incomming checklists'}
                            </>
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
                            <>
                                {' '}
                                {isLeader
                                    ? 'In progress'
                                    : 'Outgoing checklists'}
                            </>
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
              
                    <Outlet />
                </Tabs>
            </MainWrap>
        </>
    )
}

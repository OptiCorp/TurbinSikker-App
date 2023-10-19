import { Tabs } from '@equinor/eds-core-react'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useRoles } from '../../services/useRoles'
import { COLORS } from '../../style/GlobalStyles'
import { MainWrap } from './styles'

export const IndexCheckLists = () => {
    const [activeTab, setActiveTab] = useState(0)
    const handleChange = (index: number) => {
        setActiveTab(index)
    }

    const { isLeader } = useRoles()
    return (
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
                            to="/Checklists"
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
                            {isLeader ? <>Sent</> : <>Received </>}
                        </Tabs.Tab>
                        <Tabs.Tab
                            as={Link}
                            to="/MyCheckLists"
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
                            {isLeader ? <> My checklists</> : <>Submitted</>}
                        </Tabs.Tab>
                        <Tabs.Tab
                            as={Link}
                            to="/CompletedChecklists"
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
                            Completed
                        </Tabs.Tab>
                    </Tabs.List>

                    <>
                        <Outlet />
                    </>
                </Tabs>
            </>
        </MainWrap>
    )
}

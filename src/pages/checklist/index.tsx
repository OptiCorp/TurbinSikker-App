import { Tabs } from '@equinor/eds-core-react'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import useSnackBar from '../../components/snackbar/useSnackBar'
import { useRoles } from '../../services/useRoles'
import { COLORS } from '../../style/GlobalStyles'
import { MainWrap } from './styles'

export const IndexCheckLists = () => {
    const [activeTab, setActiveTab] = useState(1)
    const [activeInspectorTab, setActiveInspectorTab] = useState(0)

    const handleChange = (index: number) => {
        setActiveTab(index)
    }

    const handleInspectorChange = (index: number) => {
        setActiveInspectorTab(index)
    }
 

    const { isLeader } = useRoles()

    return (
        <MainWrap>
         
            <>
                {isLeader ? (
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
                                For review
                            </Tabs.Tab>
                        </Tabs.List>

                        <>
                            <Outlet />
                        </>
                    </Tabs>
                ) : (
                    <Tabs
                        variant="minWidth"
                        onChange={handleInspectorChange}
                        activeTab={activeInspectorTab}
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
                                        activeInspectorTab === 0
                                            ? COLORS.primary
                                            : COLORS.frostyGray,
                                }}
                            >
                                <>Incomming</>
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
                                        activeInspectorTab === 1
                                            ? COLORS.primary
                                            : COLORS.frostyGray,
                                }}
                            >
                                <>Outgoing</>
                            </Tabs.Tab>
                        </Tabs.List>

                        <>
                            <Outlet />
                        </>
                    </Tabs>
                )}{' '}
            </>
        </MainWrap>
    )
}

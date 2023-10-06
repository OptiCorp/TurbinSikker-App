import { Tabs } from '@equinor/eds-core-react'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

import useGlobal from '../../context/globalContextProvider'
import { MainWrap } from './styles'

export const IndexCheckLists = () => {
    const [activeTab, setActiveTab] = useState(1)
    const handleChange = (index: number) => {
        setActiveTab(index)
    }
    const { currentUser } = useGlobal()

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
                            to="/Checklist"
                            style={{
                                borderBottom: 'none',
                                borderTopRightRadius: '10px',
                                borderTopLeftRadius: '10px',
                                color: 'black',
                                backgroundColor:
                                    activeTab === 0 ? '#007079' : '#f5f5f5',
                            }}
                        >
                            {currentUser?.userRole.name === 'Leader' ? (
                                <> Submitted CheckLists</>
                            ) : (
                                <>In progress</>
                            )}
                        </Tabs.Tab>
                        <Tabs.Tab
                            as={Link}
                            to="/MyCheckLists"
                            style={{
                                borderBottom: 'none',
                                borderTopRightRadius: '10px',
                                borderTopLeftRadius: '10px',
                                color: 'black',
                                backgroundColor:
                                    activeTab === 1 ? '#007079' : '#f5f5f5',
                            }}
                        >
                            {currentUser?.userRole.name === 'Leader' ? (
                                <> My checklists</>
                            ) : (
                                <>Submitted</>
                            )}
                        </Tabs.Tab>
                        <Tabs.Tab
                            as={Link}
                            to="/CompletedChecklist"
                            style={{
                                borderBottom: 'none',
                                borderTopRightRadius: '10px',
                                borderTopLeftRadius: '10px',
                                color: 'black',
                                backgroundColor:
                                    activeTab === 2 ? '#007079' : '#f5f5f5',
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

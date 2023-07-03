import { useState } from 'react'

import { Tabs } from '@equinor/eds-core-react'
import { Link, Outlet } from 'react-router-dom'
import {
    StyledTabs,
    StyledTabList,
    Wrapper,
    Test,
    ContentWrapper,
} from './styles'

export const IndexCheckLists = () => {
    const [activeTab, setActiveTab] = useState(1)

    const handleChange = (index: number) => {
        setActiveTab(index)
    }

    return (
        <>
            <Wrapper>
                <StyledTabs
                    variant="minWidth"
                    activeTab={activeTab}
                    onChange={handleChange}
                >
                    <StyledTabList>
                        <Tabs.Tab as={Link} to="/CheckList">
                            Submitted CheckLists
                        </Tabs.Tab>

                        <Test>
                            <Tabs.Tab as={Link} to="/MyCheckLists">
                                My CheckLists
                            </Tabs.Tab>
                        </Test>
                    </StyledTabList>
                    <ContentWrapper>
                        <Outlet />
                    </ContentWrapper>
                </StyledTabs>
            </Wrapper>
        </>
    )
}

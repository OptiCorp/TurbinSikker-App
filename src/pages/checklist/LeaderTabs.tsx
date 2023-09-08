import { Tabs } from '@equinor/eds-core-react'
import { Link } from 'react-router-dom'
import { StyledTabh3, TabSubmittedWrap, TabWrap } from './styles'

export const LeaderTabs = () => {
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

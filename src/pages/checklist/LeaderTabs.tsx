import { Tabs } from '@equinor/eds-core-react'
import { Link } from 'react-router-dom'
import { StyledTabh3 } from './styles'

export const LeaderTabs = () => {
    return (
        <>
            <Tabs.Tab
                as={Link}
                to="/CheckList"
                style={{
                    borderBottom: 'none',
                }}
            >
                Submitted CheckLists
            </Tabs.Tab>
            <Tabs.Tab
                as={Link}
                to="/MyCheckLists"
                style={{
                    borderBottom: 'none',
                }}
            >
                <StyledTabh3> My CheckLists</StyledTabh3>
            </Tabs.Tab>
        </>
    )
}

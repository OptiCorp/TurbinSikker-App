import { assignment, checkbox, lock } from '@equinor/eds-icons'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FooterContainer, StyledList, StyledTab, StyledTabs } from '../styles'
import { Item } from './NavItems'

export const DefaultNavigation: React.FC<{
    hideNavbar: boolean | undefined
}> = ({ hideNavbar }) => {
    const path = useLocation()
    const [activeTab, setActiveTab] = useState(
        path.pathname.includes('ListPunches')
            ? 0
            : path.pathname.includes('checklist')
            ? 1
            : 2
    )

    const handleChange = (index: number) => {
        setActiveTab(index)
    }

    return (
        <FooterContainer>
            {!hideNavbar && (
                <StyledTabs
                    activeTab={activeTab}
                    onChange={handleChange}
                    variant="fullWidth"
                >
                    <StyledList>
                        <StyledTab as={Link} to="/ListPunches">
                            <Item
                                icon={checkbox}
                                name="Punches"
                                isActive={activeTab === 0}
                            />
                        </StyledTab>
                        <StyledTab as={Link} to="/checklist">
                            <Item
                                icon={assignment}
                                name="Checklists"
                                isActive={activeTab === 1}
                            ></Item>{' '}
                        </StyledTab>
                        <StyledTab as={Link} to="/404">
                            <Item
                                icon={lock}
                                name="placeholder"
                                isActive={activeTab === 2}
                            />
                        </StyledTab>
                    </StyledList>
                </StyledTabs>
            )}
        </FooterContainer>
    )
}

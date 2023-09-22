import { assignment, checkbox, lock } from '@equinor/eds-icons'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FooterContainer, StyledList, StyledTab, StyledTabs } from '../styles'
import { NavItem } from './NavItem'

export const DefaultNavigation: React.FC<{
    hideNavbar: boolean
}> = ({ hideNavbar }) => {
    const path = useLocation()
    const [activeTab, setActiveTab] = useState<number | undefined>(
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
                        <StyledTab>
                            <NavItem
                                icon={checkbox}
                                name="Punches"
                                isActive={activeTab === 0}
                                to="/ListPunches"
                            />
                        </StyledTab>
                        <StyledTab>
                            <NavItem
                                icon={assignment}
                                name="Checklists"
                                isActive={activeTab === 1}
                                to="/checklist"
                            />
                        </StyledTab>
                        <StyledTab>
                            <NavItem
                                icon={lock}
                                name="placeholder"
                                isActive={activeTab === 2}
                                to="/404"
                            />
                        </StyledTab>
                    </StyledList>
                </StyledTabs>
            )}
        </FooterContainer>
    )
}

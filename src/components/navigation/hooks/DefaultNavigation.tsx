import { assignment, credit_card, info_circle } from '@equinor/eds-icons'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useRoles } from '../../../services/useRoles'
import { FooterContainer, StyledList, StyledTab, StyledTabs } from '../styles'
import { NavItem } from './NavItem'
import useGlobal from '../../../context/globalContextProvider'

export const DefaultNavigation: React.FC<{
    hideNavbar: boolean
}> = ({ hideNavbar }) => {
    const path = useLocation()
    const [activeTab, setActiveTab] = useState<number | undefined>(
        path.pathname.includes('Punches') || path.pathname.includes('punch')
            ? 0
            : path.pathname.includes('Checklists') ||
                path.pathname.includes('MyChecklists') ||
                path.pathname.includes('CompletedChecklists')
                ? 1
                : path.pathname.includes('Invoices')
                    ? 2
                    : undefined
    )

    const handleChange = (index: number) => {
        setActiveTab(index)
    }

    const { isInspector } = useRoles()
    const { currentUser } = useGlobal()
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
                                icon={info_circle}
                                name="Punches"
                                isActive={activeTab === 0}
                                to="/Punches"
                            />
                        </StyledTab>
                        <StyledTab>
                            {isInspector ? (
                                <NavItem
                                    icon={assignment}
                                    name="Checklists"
                                    isActive={activeTab === 1}
                                    to="/MyCheckLists"
                                />
                            ) : (
                                <NavItem
                                    icon={assignment}
                                    name="Checklists"
                                    isActive={activeTab === 1}
                                    to="/Checklists"
                                />
                            )}
                        </StyledTab>

                        {currentUser?.userRole.name === "Leader" ? (
                            <StyledTab>
                                <NavItem
                                    icon={credit_card}
                                    name="Invoices"
                                    isActive={activeTab === 2}
                                    to="/Invoice"
                                />
                            </StyledTab>
                        ) : <></>
                        }





                    </StyledList>
                </StyledTabs>
            )}
        </FooterContainer>
    )
}

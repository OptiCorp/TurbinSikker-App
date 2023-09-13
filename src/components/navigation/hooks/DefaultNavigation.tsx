import { action } from '@storybook/addon-actions'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FooterContainer, StyledList, StyledTab, StyledTabs } from '../styles'
import { Items } from './NavItems'

export const DefaultNavigation: React.FC<{ hideNavbar: boolean }> = ({
    hideNavbar,
}) => {
    const [activeTab, setActiveTab] = useState(1)

    const handleChange = (index: number) => {
        setActiveTab(index)
    }

    const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
        action('handleFocus')(e.target.textContent)
    }
    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        action('handleBlur')(e.target.textContent)
    }

    return (
        <FooterContainer>
            {!hideNavbar && (
                <StyledTabs
                    activeTab={activeTab}
                    onChange={handleChange}
                    variant="fullWidth"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                >
                    <StyledList>
                        {Items({ activeTab }).map(({ name, value }, index) => (
                            <StyledTab
                                as={Link}
                                to={
                                    name === 'Tab 1'
                                        ? '/ListPunches'
                                        : name === 'Tab 2'
                                        ? '/CheckList'
                                        : name === 'Tab 3'
                                        ? '/404'
                                        : ''
                                }
                                key={name}
                            >
                                {value(index)}
                            </StyledTab>
                        ))}
                    </StyledList>
                </StyledTabs>
            )}
        </FooterContainer>
    )
}

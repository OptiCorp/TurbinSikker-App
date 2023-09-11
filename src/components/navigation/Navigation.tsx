import { Icon, Typography } from '@equinor/eds-core-react'
import { assignment, checkbox, lock } from '@equinor/eds-icons'
import { action } from '@storybook/addon-actions'
import { useState } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { useUserContext } from '../../pages/users/context/userContextProvider'
import {
    ActiveChecklistContainer,
    ChecklistContainer,
    FooterContainer,
    ImageContainer,
    ImageContainerActive,
    StyledList,
    StyledTab,
    StyledTabs,
    Test,
} from './styles'

export const Navigation: React.FC = () => {
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

    const appLocation = useLocation()
    const { currentUser } = useUserContext()

    const hideFooter = () => {
        const hideList = [
            'AddUser',
            'EditUser',
            'EditCheckList',
            'PreviewCheckList',
            'FillOutCheckList',
            'AddPunch',
            'SendCheckList',
            'MyCheckLists',
        ]

        if (hideList.find((x) => appLocation.pathname.includes(x))) {
            return true
        }

        if (currentUser?.userRole.name === 'Inspector') {
            return false
        }
        return false
    }

    const items = [
        {
            name: 'Tab 1',
            value: (index?: number) =>
                activeTab === index ? (
                    <ImageContainerActive>
                        <Icon data={checkbox} size={24} />
                        <Typography variant="caption" color={'#73b1b5'}>
                            Punches
                        </Typography>{' '}
                    </ImageContainerActive>
                ) : (
                    <ImageContainer>
                        <Icon data={checkbox} size={24} />
                        <Typography variant="caption" color={'white'}>
                            Punches
                        </Typography>{' '}
                    </ImageContainer>
                ),
        },
        {
            name: 'Tab 2',
            value: (index?: number) =>
                activeTab === index ? (
                    <ActiveChecklistContainer>
                        <Icon data={assignment} size={24} />
                        <Typography variant="caption" color={'#73b1b5'}>
                            Checklists
                        </Typography>
                    </ActiveChecklistContainer>
                ) : (
                    <ChecklistContainer>
                        <Icon data={assignment} size={24} />
                        <Typography variant="caption" color={'white'}>
                            Checklists
                        </Typography>
                    </ChecklistContainer>
                ),
        },
        {
            name: 'Tab 3',
            value: () => (
                <Test>
                    {' '}
                    <Icon data={lock} size={24} />{' '}
                    <Typography variant="caption" color={'white'}>
                        ---
                    </Typography>
                </Test>
            ),
        },
    ]

    return (
        <>
            {hideFooter() ? null : (
                <FooterContainer>
                    <StyledTabs
                        activeTab={activeTab}
                        onChange={handleChange}
                        variant="fullWidth"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    >
                        <StyledList>
                            {items.map(({ name, value }, index) => (
                                <StyledTab
                                    as={Link}
                                    to={
                                        name === 'Tab 1'
                                            ? '/ListPunches'
                                            : '/CheckList'
                                    }
                                    key={name}
                                >
                                    {value(index)}
                                </StyledTab>
                            ))}
                        </StyledList>
                    </StyledTabs>
                </FooterContainer>
            )}
        </>
    )
}

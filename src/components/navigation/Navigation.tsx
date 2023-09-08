import { Icon, Tabs } from '@equinor/eds-core-react'
import { assignment, menu } from '@equinor/eds-icons'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useUserContext } from '../../pages/users/context/userContextProvider'
import Sidebar from '../sidebar/Sidebar'
import { FooterContainer, ImageContainer, ImageContainerActive } from './styles'

export const Navigation: React.FC = () => {
    const [activeTab, setActiveTab] = useState(1)
    const navigate = useNavigate()
    const handleChange = (index: number) => {
        setActiveTab(index)
    }
    const [open, setOpen] = useState(false)
    const appLocation = useLocation()
    const { currentUser } = useUserContext()
    const items = [
        {
            name: 'Tab 1',
            value: (index?: number) =>
                activeTab === index ? (
                    <ImageContainerActive
                        onClick={() => navigate('/ListPunches')}
                    />
                ) : (
                    <ImageContainer onClick={() => navigate('/ListPunches')} />
                ),
        },
        {
            name: 'Tab 2',
            value: (index?: number) => (
                <Icon
                    data={assignment}
                    size={40}
                    style={{
                        color: activeTab === index ? '#73B1B5' : 'white',
                        width: 'min(500px)',
                    }}
                    onClick={() => navigate('/CheckList')}
                />
            ),
        },
        {
            name: 'Tab 3',
            value: (index?: number) => (
                <Icon
                    data={menu}
                    size={40}
                    style={{
                        color: activeTab === index ? '#73B1B5' : 'white',
                        width: 'min(500px)',
                    }}
                    onClick={() => setOpen(!open)}
                />
            ),
        },
    ]

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

    return (
        <>
            <Sidebar open={open} setOpen={setOpen} />
            {hideFooter() ? null : (
                <FooterContainer>
                    <Tabs activeTab={activeTab} onChange={handleChange}>
                        <Tabs.List
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr 1fr',
                                gap: '70px',
                            }}
                        >
                            {items.map(({ name, value }, index) => (
                                <Tabs.Tab key={name}>{value(index)}</Tabs.Tab>
                            ))}
                        </Tabs.List>
                    </Tabs>
                </FooterContainer>
            )}
        </>
    )
}

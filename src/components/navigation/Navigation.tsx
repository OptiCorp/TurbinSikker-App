import { Icon, Tabs } from '@equinor/eds-core-react'
import { assignment, menu } from '@equinor/eds-icons'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
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

    const items = [
        {
            name: 'Tab 1',
            value: (index?: number) =>
                activeTab === index ? (
                    <ImageContainerActive />
                ) : (
                    <ImageContainer />
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

    return (
        <>
            <Sidebar open={open} setOpen={setOpen} />
            {appLocation.pathname === '/AddUser/' ||
            appLocation.pathname.includes('EditUser') ||
            appLocation.pathname.includes('MyCheckLists') ||
            appLocation.pathname.includes('EditCheckList') ||
            appLocation.pathname.includes('/PreviewCheckList/') ||
            appLocation.pathname.includes('SendCheckList') ? null : (
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

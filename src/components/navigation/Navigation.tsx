import { FooterContainer, ImageContainerActive, ImageContainer } from './styles'
import { menu, assignment } from '@equinor/eds-icons'
import Sidebar from '../sidebar/Sidebar'
import { Icon } from '@equinor/eds-core-react'
import { useState } from 'react'
import { Tabs } from '@equinor/eds-core-react'

export const Navigation: React.FC = () => {
    const [activeTab, setActiveTab] = useState(1)

    const handleChange = (index: number) => {
        setActiveTab(index)
    }
    const [open, setOpen] = useState(false)

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
        </>
    )
}

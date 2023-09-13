import { Icon, Typography } from '@equinor/eds-core-react'
import { assignment, checkbox, lock } from '@equinor/eds-icons'
import {
    ActiveChecklistContainer,
    ActiveThirdTab,
    ChecklistContainer,
    ImageContainer,
    ImageContainerActive,
    ThirdTab,
} from '../styles'

export const Items = ({ activeTab }: { activeTab: number }) => [
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
        value: (index?: number) =>
            activeTab === index ? (
                <ActiveThirdTab>
                    {' '}
                    <Icon data={lock} size={24} color="#73b1b5" />{' '}
                    <Typography variant="caption" color={'#73b1b5'}>
                        ---
                    </Typography>
                </ActiveThirdTab>
            ) : (
                <ThirdTab>
                    {' '}
                    <Icon data={lock} size={24} />{' '}
                    <Typography variant="caption" color={'white'}>
                        ---
                    </Typography>
                </ThirdTab>
            ),
    },
]

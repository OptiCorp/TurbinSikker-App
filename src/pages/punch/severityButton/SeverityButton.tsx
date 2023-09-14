import { Icon } from '@equinor/eds-core-react'
import { error_filled, info_circle, warning_filled } from '@equinor/eds-icons'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Button } from '../styles'

function SeverityButton({
    //severity,
    setSeverity,
    defaultValue,
}: {
    severity: SetStateAction<string>
    setSeverity: Dispatch<SetStateAction<string>>
    defaultValue: string
}) {
    const [activeButtonIndex, setActiveButtonIndex] = useState(0)

    const SeverityButtons = [
        {
            name: 'Minor',
            icon: info_circle,
            color: '#FBCA36',
        },
        {
            name: 'Major',
            icon: warning_filled,
            color: '#ED8936',
        },
        {
            name: 'Critical',
            icon: error_filled,
            color: '#EB0000',
        },
    ]
    function handleChecked(index: number) {
        setActiveButtonIndex(index)
        setSeverity(SeverityButtons[index].name)
    }

    useEffect(() => {
        const index = SeverityButtons.findIndex(
            (button) => button.name === defaultValue
        )
        if (index !== -1) {
            setActiveButtonIndex(index)
        }
    }, [defaultValue])

    return (
        <>
            {SeverityButtons.map((button, index) => {
                const isActive = index === activeButtonIndex
                const isMiddleButton =
                    activeButtonIndex === Math.floor(SeverityButtons.length / 2)
                const isFurthestButton =
                    index === 0 || index === SeverityButtons.length - 1

                const buttonStyle: React.CSSProperties = {
                    backgroundColor: isActive ? '#fff' : 'transparent',
                    boxShadow: !isActive ? 'none' : '0px 4px 4px 0px #bebebe',
                    color: isActive ? '#000' : '#bebebe',
                    borderRadius: 4,
                }

                const dividerStyle = {
                    width: '100%',
                    borderLeft:
                        isFurthestButton &&
                        !isActive &&
                        !isMiddleButton &&
                        activeButtonIndex === 0
                            ? '1px solid #dcdcdc'
                            : 'none',
                    borderRight:
                        isFurthestButton &&
                        !isActive &&
                        !isMiddleButton &&
                        activeButtonIndex !== 0
                            ? '1px solid #dcdcdc'
                            : 'none',
                }

                return (
                    <div style={dividerStyle} key={index}>
                        <Button
                            style={buttonStyle}
                            type="button"
                            onClick={() => handleChecked(index)}
                        >
                            <Icon
                                data={button.icon}
                                color={isActive ? button.color : '#BEBEBE'}
                                style={{ zIndex: 3 }}
                            />
                            {button.name}
                        </Button>
                    </div>
                )
            })}
        </>
    )
}

export default SeverityButton

import { Icon } from '@equinor/eds-core-react'
import { error_filled, info_circle, warning_filled } from '@equinor/eds-icons'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Button } from '../styles'
import { useHasPermission } from '../../../pages/users/hooks/useHasPermission'
import { useLocation } from 'react-router'
import { PunchItem, Status } from '../../../services/apiTypes'
import { COLORS } from '../../../style/GlobalStyles'

function SeverityButton({
    punch,
    userInput,
    setUserInput,
    defaultValue,
}: {
    punch?: PunchItem
    userInput: { severity: string | undefined; description: string | undefined }
    setUserInput: Dispatch<
        SetStateAction<{ severity: string | undefined; description: string | undefined }>
    >
    defaultValue: string | undefined
}) {
    const { hasPermission } = useHasPermission()
    const appLocation = useLocation()
    const [activeButtonIndex, setActiveButtonIndex] = useState(0)

    const path = appLocation.pathname.split('/')
    const lastPathSegment = path[path.length - 1]

    const SeverityButtons = [
        {
            name: 'Minor',
            icon: info_circle,
            color: COLORS.cautionaryYellow,
        },
        {
            name: 'Major',
            icon: warning_filled,
            color: COLORS.warningOrange,
        },
        {
            name: 'Critical',
            icon: error_filled,
            color: COLORS.dangerRed,
        },
    ]
    function handleChecked(index: number) {
        setActiveButtonIndex(index)
        setUserInput({
            ...userInput,
            severity: SeverityButtons[index].name,
        })
    }

    useEffect(() => {
        const index = SeverityButtons.findIndex((button) => button.name === defaultValue)
        if (index !== -1) {
            setActiveButtonIndex(index)
        }
    }, [defaultValue])
    return (
        <>
            {SeverityButtons.map((button, index) => {
                const isActive = index === activeButtonIndex
                const isMiddleButton = activeButtonIndex === Math.floor(SeverityButtons.length / 2)
                const isFurthestButton = index === 0 || index === SeverityButtons.length - 1

                const buttonStyle: React.CSSProperties = {
                    backgroundColor: isActive ? COLORS.white : 'transparent',
                    boxShadow: !isActive ? 'none' : '0px 4px 4px 0px #bebebe',
                    color:
                        isActive || lastPathSegment === 'addpunch'
                            ? COLORS.black
                            : Status.REJECTED !== punch?.status || hasPermission
                            ? COLORS.gray
                            : COLORS.black,
                    borderRadius: 4,
                }

                const dividerStyle = {
                    width: '100%',
                    borderLeft:
                        isFurthestButton && !isActive && !isMiddleButton && activeButtonIndex === 0
                            ? '1px solid #dcdcdc'
                            : 'none',
                    borderRight:
                        isFurthestButton && !isActive && !isMiddleButton && activeButtonIndex !== 0
                            ? '1px solid #dcdcdc'
                            : 'none',
                }

                return (
                    <div style={dividerStyle} key={index}>
                        <Button
                            style={buttonStyle}
                            type="button"
                            onClick={() => handleChecked(index)}
                            disabled={
                                (punch?.status !== Status.REJECTED &&
                                    lastPathSegment !== 'addpunch') ||
                                hasPermission
                            }
                        >
                            <Icon
                                data={button.icon}
                                color={
                                    lastPathSegment === 'addpunch' || isActive
                                        ? button.color
                                        : Status.REJECTED !== punch?.status || hasPermission
                                        ? COLORS.gray
                                        : button.color
                                }
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

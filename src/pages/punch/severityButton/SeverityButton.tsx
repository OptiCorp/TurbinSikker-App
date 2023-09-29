import { Icon } from '@equinor/eds-core-react'
import { error_filled, info_circle, warning_filled } from '@equinor/eds-icons'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Button } from '../styles'
import { Punch, Status } from '../types'
import { usePunchContext } from '../context/PunchContextProvider'
import { useHasPermission } from '../../../pages/users/hooks/useHasPermission'
import { useLocation } from 'react-router'

function SeverityButton({
    //severity,
    /* setSeverity, */
    userInput,
    setUserInput,
    defaultValue,
}: {
    /* severity: SetStateAction<string>
    setSeverity: Dispatch<SetStateAction<{ severity: string }>> */
    userInput: { severity: string | undefined; description: string | undefined }
    setUserInput: Dispatch<
        SetStateAction<{ severity: string | undefined; description: string | undefined }>
    >
    defaultValue: string | undefined
}) {
    const { punch } = usePunchContext()
    const { hasPermission } = useHasPermission()
    const appLocation = useLocation()
    const [activeButtonIndex, setActiveButtonIndex] = useState(0)

    const path = appLocation.pathname.split('/')
    const lastPathSegment = path[path.length - 1]

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
        /* setSeverity(SeverityButtons[index].name) */
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
                    backgroundColor: isActive ? '#fff' : 'transparent',
                    boxShadow: !isActive ? 'none' : '0px 4px 4px 0px #bebebe',
                    color:
                        isActive || lastPathSegment === 'addpunch'
                            ? '#000'
                            : Status.REJECTED !== punch?.status || hasPermission
                            ? '#BEBEBE'
                            : '#000' /* isActive ? '#000' : '#bebebe', */,
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
                                    /* isActive ? button.color : '#BEBEBE' */ lastPathSegment ===
                                        'addpunch' || isActive
                                        ? button.color
                                        : Status.REJECTED !== punch?.status || hasPermission
                                        ? '#BEBEBE'
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

import styled from 'styled-components'
import { Icon } from '@equinor/eds-core-react'
import { close, fullscreen } from '@equinor/eds-icons'
import { COLORS } from '../../../style/GlobalStyles'
import { useEffect, useRef } from 'react'

type ModalProps = {
    /** Callback to handle opening the modal. */
    onOpen?: () => void
    /** Callback to handle closing the modal. */
    onClose: () => void
    /** Toggle show fullscreen icon. */
    fullscreenIcon?: boolean
    /** Whether modal can be dismissed with outside click
     */
    isDismissable?: boolean
    children: React.ReactNode
}

export const Modal = ({ onOpen, onClose, fullscreenIcon, isDismissable, children }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            e.stopPropagation()
            if (
                modalRef.current &&
                !modalRef.current.contains(e.target as Node) &&
                !(e.target instanceof HTMLImageElement)
            ) {
                onClose()
            }
        }
        if (isDismissable) {
            document.addEventListener('click', handleOutsideClick)
        }

        return () => {
            if (isDismissable) {
                document.removeEventListener('click', handleOutsideClick)
            }
        }
    }, [])
    return (
        <ImageContainer ref={modalRef} onClick={onOpen}>
            {children}
            {fullscreenIcon && (
                <Fullscreen>
                    <Icon color={'rgba(255, 255, 255, .6)'} size={48} data={fullscreen} />
                </Fullscreen>
            )}
        </ImageContainer>
    )
}

export const ModalContent = ({
    onClose,
    children,
}: {
    /** Callback to handle closing the modal. */
    onClose: () => void
    children: React.ReactNode
}) => {
    return (
        <ModalContainer>
            <ModalClose onClick={onClose}>
                <Icon data={close} size={48} />
            </ModalClose>
            <ModalContentContainer>{children}</ModalContentContainer>
        </ModalContainer>
    )
}

const Fullscreen = styled.div`
    position: absolute;
    top: 45%;
    left: 50%;
    display: none;
`
const ImageContainer = styled.div`
    position: relative;

    :hover {
        cursor: pointer;
        ${Fullscreen} {
            display: block;
        }
    }
`

const ModalContainer = styled.div`
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.8);
`

const ModalContentContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`

const ModalClose = styled.span`
    position: absolute;
    top: 15%;
    right: 5%;
    color: ${COLORS.white};
    cursor: pointer;
`

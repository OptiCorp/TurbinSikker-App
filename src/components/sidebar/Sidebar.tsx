import { Button, Scrim, Typography } from '@equinor/eds-core-react'
import { FunctionComponent } from 'react'
import Logosidebar from '../../assets/images/bigLogo.png'
import { Container, LinkContainer, RouteName, StyledSheet } from './styles'

import { useMsal } from '@azure/msal-react'
import { Link, useNavigate } from 'react-router-dom'

export type Props = {
    open: boolean
    setOpen: (open: boolean) => void
}

const Sidebar: FunctionComponent<Props> = ({ open, setOpen }) => {
    const navigate = useNavigate()
    const { instance } = useMsal()
    const handleSubmit = () => {
        navigate('/')
        instance.logoutPopup()
    }
    return (
        <>
            <Scrim
                open={open}
                onClose={() => setOpen(!open)}
                isDismissable
                style={{
                    overflow: 'hidden',
                }}
            >
                {' '}
                <StyledSheet open={open} onClose={() => setOpen(!open)}>
                    {' '}
                    <Container>
                        <img style={{ width: '100%' }} src={Logosidebar} />
                    </Container>
                    <LinkContainer>
                        <Button as={Link} to="/profile" fullWidth variant="ghost">
                            <RouteName>
                                <Typography
                                    variant="body_long_bold"
                                    color="white"
                                    style={{ minWidth: '100px' }}
                                    token={{ fontSize: '1.6em' }}
                                >
                                    Profile
                                </Typography>
                            </RouteName>
                        </Button>
                        <Button as={Link} to="/ListUsers" fullWidth variant="ghost">
                            <RouteName>
                                <Typography
                                    variant="body_long_bold"
                                    color="white"
                                    style={{ minWidth: '100px' }}
                                    token={{ fontSize: '1.6em' }}
                                >
                                    Users{' '}
                                </Typography>
                            </RouteName>
                        </Button>
                        <Button fullWidth variant="ghost" onClick={handleSubmit}>
                            <RouteName>
                                {' '}
                                <Typography
                                    variant="body_long_bold"
                                    color="white"
                                    token={{ fontSize: '1.6em' }}
                                    style={{ minWidth: '100px' }}
                                >
                                    Sign Out
                                </Typography>
                            </RouteName>
                        </Button>
                    </LinkContainer>
                </StyledSheet>
            </Scrim>
        </>
    )
}
export default Sidebar

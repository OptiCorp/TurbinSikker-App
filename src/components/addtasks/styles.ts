import { Card } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { COLORS } from '../../style/GlobalStyles'
export const TitleHeader = styled.div`
    margin: 0 auto;
`

export const ControllerWrap = styled.div`
    grid-column: 1/2;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
`

export const StyledCard = styled(Card)`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
`
export const customStyles = {
    control: (styles: any) => ({
        ...styles,
        cursor: 'pointer',

        background: '#F7F7F7',
        borderBottom: `1px solid ${COLORS.black}`,
    }),

    option: (base: any) => ({ ...base, cursor: 'pointer', width: '350px' }),
    container: (styles: any) => ({
        ...styles,
        width: 350,

        cursor: 'pointer',
        paddingBottom: '10px',
    }),
    menu: (styles: any) => ({
        ...styles,
        width: '500',

        cursor: 'pointer',
        lineHeight: '20px',
    }),
}

export const BtnWrapBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    margin: 0 auto;
`

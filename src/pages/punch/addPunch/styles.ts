import styled, { css } from 'styled-components'
import { COLORS } from '../../../style/GlobalStyles'

export const PunchAddContainer = styled.div`
    padding: 20px;
    width: 90%;
`

export const PunchAddUploadContainer = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 20px;
`

export const PunchUploadFileContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${COLORS.lightSteelBlue};
`

export const PunchUploadFilesContainer = styled.div`
    margin-left: 8px;
`

export const SeverityContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    margin-top: 20px;
`

export const SeverityButtonWrapper = styled.div`
    background-color: ${COLORS.paleGray};
    display: flex;
    border-radius: 4px;
    padding: 5px;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
`

export const PunchUploadButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-right: ${COLORS.lightSteelBlue} solid 0.7px;
    padding-right: 20px;
    gap: 8px;
    label {
        ${(props: { disabled: boolean | undefined }) =>
            props.disabled &&
            css`
                background-color: ${COLORS.lightGray};
            `}
    }
`

export const PunchUploadButtonIconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.7px dotted ${COLORS.primary};
    border-radius: 4px;

    ${(props: { disabled: boolean | undefined }) =>
        props.disabled &&
        css`
            border: 0.7px dotted ${COLORS.lightGray};
        `}
`
export const PunchUploadButtonLabel = styled.label`
    box-sizing: border-box;
    background: ${COLORS.primary};
    border-radius: 4px;
    color: ${COLORS.white};
    display: inline-block;
    margin: 0px;
    padding: 10px 16px;
    text-align: center;
`

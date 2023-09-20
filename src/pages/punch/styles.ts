import styled from 'styled-components'

export const PunchWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: end;
    max-width: 768px;
    padding: 20px;

    h4 {
        font-weight: normal;
        margin: 0;
    }

    p {
        color: #656565;
    }

    span {
        color: #243746;
    }
`
export const PunchHeader = styled.div`
    min-width: 320px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    text-align: right;

    p {
        margin: 0;
    }
`

export const PunchUploadContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    img {
        width: 100%;
    }
`

export const SeverityIconContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4;
`

export const PunchDescriptionContainer = styled.div`
    width: 100%;

    /* p {
        margin-bottom: 48px;
    } */
`

export const PunchButton = styled.button`
    color: #007079;
    border: none;
    background-color: transparent;
    font-size: 12px;
    line-height: 150%;
`

export const Button = styled.button`
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    border-radius: 4px;
    width: 100%;
    border: none;
    box-shadow: 0px 4px 4px 0px #bebebe;
    min-height: 70px;
`

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const PunchDateContainer = styled.div`
    text-align: right;
    p {
        margin: 0;
    }
`

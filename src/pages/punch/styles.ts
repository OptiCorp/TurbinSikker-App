import styled from 'styled-components'

export const PunchWrapper = styled.div`
    margin: 0;
    position: relative;
    display: flex;

    flex-direction: column;
    max-width: 768px;
    /* padding: 20px; */

    h4 {
        font-weight: normal;
        margin: 0;
    }

    span {
        color: #243746;
    }
`

export const Container = styled.div``

export const PunchHeaderWrapper = styled.div`
    padding: 0 20px;
`

export const PunchHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    align-items: center;
`

export const PunchUploadContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    min-height: 100px;
    position: relative;
    max-height: 175px;
    button {
        position: absolute;
        right: 0;
        height: 100%;
        opacity: 50%;

        background-color: transparent;
        border: none;
    }

    img {
        width: 100%;
        margin: auto;
    }
`

export const SeverityIconContainer = styled.div`
    align-items: center;
    /* padding-left: 2rem; */
    gap: 4;
`

export const PunchDescriptionContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    padding-left: 2rem;
    margin-top: 15px;
    p {
        margin-bottom: 48px;
    }
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
    display: flex;
    gap: 4px;
`

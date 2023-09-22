import styled from 'styled-components'

export const PunchWrapper = styled.div`
    margin: 0;
    position: relative;
    display: flex;

    flex-direction: column;

    max-width: 768px;
    h4 {
        font-weight: normal;
        margin: 0;
    }

    span {
        color: #243746;
    }
`

export const Container = styled.div``

export const PunchHeader = styled.div`
    min-width: 320px;
    width: 90%;
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
    min-height: 175px;
`

export const SeverityIconContainer = styled.div`
    display: flex;
    align-items: center;
    padding-left: 2rem;
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
    position: absolute;
    right: 0;
    bottom: 100px;
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

import styled from 'styled-components'

export const SendBackgroundWrap = styled.div`
    background: whitesmoke;

    overflow: hidden;
    margin: 0 auto;

    width: 100%;
`

export const SendBox = styled.div`
    margin: 0 auto;
    overflow: hidden;
    display: grid;

    grid-template-columns: 1fr;
    grid-template-rows: 100px 100px 100px;
    min-height: 800px;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`
export const FormContainer = styled.div`
    background: whitesmoke;
    min-height: 300px;
    display: flex;
    flex-direction: column;

    width: 300px;
    display: flex;
    margin: 0 auto;
`

export const RecipientsContainer = styled.div`
    background: whitesmoke;
    min-height: 300px;
    display: flex;
    flex-direction: column;

    width: 300px;
    display: flex;
    margin: 0 auto;
`
export const Bar = styled.div`
    min-height: 30px;
    max-height: 70px;
    width: 100%;

    background: #007079;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;

    color: white;
`

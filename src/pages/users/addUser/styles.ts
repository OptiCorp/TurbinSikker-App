import styled from 'styled-components'

export const Wrapper = styled.div`
    margin: 2rem auto;
    display: grid;
    align-items: center;
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: 1fr;
    width: 80%;
    height: 600px;
    max-width: 600px;
`
export const FormWrapper = styled.form`
    margin: 0 auto;
    width: 100%;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 30px;
`
export const BtnWrapper = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    padding-top: 10px;
    justify-content: space-evenly;
`
export const UserInfoWrapper = styled.div`
    margin-top: 52px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: start;
`

export const UserTitle = styled.h1`
    margin-bottom: 20px;
`

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
    width: 100%;
    min-width: 300px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: left;
    gap: 30px;
`
export const BtnWrapper = styled.div`
    display: flex;
    flex-direction: row;
    padding-top: 10px;
    margin: 0 auto;

    justify-content: space-evenly;
`

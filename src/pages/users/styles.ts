import styled from 'styled-components'

export const Wrapper = styled.div`
    margin: 0 auto;
    display: grid;

    align-items: center;
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: 1fr;
    width: 80%;
    max-width: 600px;
    height: 80%;
`
export const FormWrapper = styled.form`
    width: 100%;
    min-width: 300px;
    margin: 0 auto;
`

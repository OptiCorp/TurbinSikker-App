import styled from 'styled-components'

export const Wrapper = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 800px;
    width: 100%;
`

export const ImageContainer = styled.div`
    margin: 0px auto;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 60%;

    justify-items: end;
`
export const Info = styled.div`
    margin: 1rem auto;
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    align-items: center;
    justify-content: space-around;
    height: 100px;
    max-width: 400px;
    min-width: 200px;
`

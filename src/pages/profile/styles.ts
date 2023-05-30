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
    margin: 0 auto;
    display: grid;
    align-items: end;
    grid-template-columns: 120px 1fr;
    grid-template-rows: 1fr 50px;
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

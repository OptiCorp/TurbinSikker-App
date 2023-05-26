import styled from 'styled-components'

export const Container = styled.div`
    width: 400px;
    grid-row: 1/1;
`

export const LinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 0;

    justify-content: space-between;
    gap: 90px;
    width: 100%;

    margin: 0 auto;
`

export const RouteName = styled.h3`
    max-width: 200px;
    right: 100px;
    color: white;
    font-size: 1.5rem;
`

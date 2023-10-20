import styled from 'styled-components'

export const TableWrapper = styled.div`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding-bottom: 15%;
    width: 100%;

`
export const InvoiceListItem = styled.div`
    background-color: #f0f3f3;
    padding: 10px;
    padding-top: 10px;
    flex-direction: column;
    gap: 30px;
    margin-bottom: 80px;
`

export const TextWrapper = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @media only screen and (max-width: 400px) {
        max-width: 50px;
    }
`
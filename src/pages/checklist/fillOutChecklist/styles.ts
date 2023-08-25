import { Card, Switch, TextField } from "@equinor/eds-core-react";
import styled from "styled-components";


export const AddPunchHeader = styled.div`
    display: flex;
    width: 100%;
    min-height: 50px;
   
`

export const StyledCard = styled(Card)`
    font-size: 1.5rem;
    display: grid;
    
    grid-template-columns: 1fr 1fr 1fr;

`

export const CustomCard = styled(Card)`
    font-size: 1.5rem;
    display: grid;
    column-gap: 30px;
    row-gap: 10px;
    grid-template-columns:20px auto 0px;
    grid-template-rows: 1fr 10px 30px ;
    align-items: center;
    width: 100%;
    margin: 0 auto;


`


export const StyledCardHeader = styled(Card.Header)`
 grid-column: 3/3;
 width: 150px;
 margin: 0 auto;

   
`
export const CustomCategoryName = styled.h3`
grid-column: 2/2;
grid-row: 1/1;
    height: 30px;
margin-left: 5px;
    font-size: 1rem;
    font-weight: 600;
`

export const CustomTaskField = styled(TextField)`
    text-align: center;
    margin: 0 auto;
    grid-row: 2/2;
    grid-column: 2/2;
    & textarea {
      
    }
`


export const StyledSwitch = styled(Switch)`
    
 
    margin: 0 auto;
    grid-row: 1/1;
    grid-column: 1/1;
`


export const FillOutWrap = styled.ul`
    margin: 0 auto;
    margin-bottom: 5rem;
    display: grid;
    grid-template-rows: 1fr;
    row-gap: 10%;
    padding: 2rem;
    grid-template-columns: 1fr;
    width: 40%;
    min-width: 300px;

`
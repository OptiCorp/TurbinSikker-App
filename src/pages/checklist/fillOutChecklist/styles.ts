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
 
  height: 120px;
display: block;
    width: 100%;
    margin: 0 auto;


`

export const CustomCardContent = styled(Card.Content)`
    font-size: 1.5rem;
    display: flex;
flex-direction: row;

    width: 93%;
    margin: 0 auto;


`


export const StyledCardHeader = styled(Card.Header)`
 grid-column: 3/3;
 width: 150px;
 margin: 0 auto;

   
`
export const CustomCategoryName = styled.h3`


margin-left: 20px;
    font-size: 1rem;
    font-weight: 600;
`

export const CustomTaskField = styled(TextField)`
    text-align: center;
    margin: 0 auto;
  
    & textarea {
      width: 180px;
    padding: 0;
    padding-left: 1rem;
    
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
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
   margin-top: 2rem;
height: 100%;
    padding: 2rem;

    width: 40%;
    min-width: 300px;
   

`
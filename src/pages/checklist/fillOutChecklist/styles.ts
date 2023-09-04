import { Card, Switch, TextField } from "@equinor/eds-core-react";
import styled from "styled-components";
import NA from '../../../assets/images/notApplicable.png'

export const AddPunchHeader = styled.div`
    display: flex;
    width: 100%;
    min-height: 50px;
   
`

export const NotApplicableWrap = styled.div`
   display: flex;
  flex-direction: column;

  margin: 50px auto;
  width: 50px;
  
`





export const ImageContainer = styled.div`
    background-image: url(${NA});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 50px;
    width: 30px;
    margin: 0 auto;
   
`


export const StyledCard = styled(Card)`
    font-size: 1.5rem;
    display: grid;
    
    grid-template-columns: 1fr 1fr 1fr;

`

export const CustomCard = styled(Card)`
    font-size: 1.5rem;
 
    display: grid;
  
    grid-template-columns: 1fr;
    grid-template-rows: 30px 10px;
  row-gap: 2rem;

    margin: 0 auto;


`

export const CustomCardContent = styled(Card.Content)`
    font-size: 1.5rem;
    display: flex;
flex-direction: row;

    width: 93%;
    margin: 0 auto;


`


export const StyledHeaderCard = styled(Card.Header)`

width: 100%;

   
`

export const StyledCardHeader = styled(Card.Header)`
 grid-column: 3/3;
 width: 150px;
 margin: 0 auto;

   
`


export const CustomCategoryName = styled.h3`

margin:17%;
    font-size: 1rem;
    font-weight: 600;
`

export const CustomTaskField = styled(TextField)`
   
 
  
    & textarea {
      width: 180px;
    padding: 0;
    padding-left: 10px;
    
    }

`


export const StyledSwitch = styled(Switch)`


& label{ height:0;}
 max-height: 0px !important; 
`


export const FillOutWrap = styled.ul`
    margin: 0 auto;
    margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
   margin-top: 1rem;
height: 600px;
    padding: 0;

    width: 40%;
    min-width: 300px;
 
    padding-bottom:1rem;
`


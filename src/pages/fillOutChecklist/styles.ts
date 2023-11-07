import { Card, Switch, TextField } from "@equinor/eds-core-react";
import styled from "styled-components";
import NA from "../../assets/images/notApplicable.png";
import { COLORS } from "../../style/GlobalStyles";

export const InfoHeader = styled.div`
  display: flex;
  width: 100%;
  min-height: 50px;

  background-color: ${COLORS.white};
`;

export const StyledCard = styled(Card)`
  font-size: 1.5rem;
  background: ${COLORS.white};
  margin: 0 auto;
  text-align: center;
`;

export const EditStyledCardHeader = styled(Card.Header)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 auto;
  height: 1rem;
`;

export const ReviewCardHeader = styled(Card.Header)``;

export const List = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
  justify-content: space-evenly;
  list-style: none;
`;

export const Container = styled.div`
  margin: 0;
  justify-content: flex-start;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const NotApplicableWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px auto;
  width: 50px;
`;
export const BackgroundWrap = styled.div`
  background-color: ${COLORS.frostyGray};
`;

export const Error = styled.div`
  font-size: 1rem;
  font-weight: 600;
  align-self: end;
  color: ${COLORS.dangerRed};
`;

export const ImageContainer = styled.div`
  background-image: url(${NA});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 50px;
  width: 30px;
  margin: 0 auto;
`;

export const CustomCard = styled(Card)`
  font-size: 1.5rem;
  display: grid;
  padding-top: 1rem;
  grid-template-columns: 1fr;
  grid-template-rows: 10px 10px 20px;
  height: 130px;
  row-gap: 2rem;
  padding-bottom: 1rem;
  margin: 0 auto;
`;

export const StyledReviewCard = styled(Card)`
  font-size: 1.5rem;
  display: grid;
  padding-top: 1rem;
  grid-template-columns: 1fr;
  grid-template-rows: 10px 10px 20px;
  height: 130px;
  row-gap: 2rem;
  align-content: space-between;
  padding-bottom: 1rem;
  margin: 0 auto;
`;

export const CustomCardContent = styled(Card.Content)`
  font-size: 1.5rem;
  display: flex;
  height: 60px;

  margin: 0;
  align-items: baseline;
  width: 96%;
`;

export const SubmitErrorContainer = styled.div`
  margin: 0;
  color: ${COLORS.dangerRed};
  min-width: 60px;
  display: flex;
  flex-direction: row-reverse;
  align-items: baseline;
  justify-self: end;
`;

export const CustomCategoryName = styled.h3`
  font-size: 1.2rem;
`;

export const CustomTaskField = styled(TextField)`
  & textarea {
    padding: 0;
    min-width: 150px;

    padding-left: 10px;
  }
`;

export const StyledSwitch = styled(Switch)`
  display: flex;
  flex-direction: column-reverse;
  margin: 0 auto;
  align-items: baseline;
  & label {
    height: 0;
  }
  max-height: 0px !important;
`;

export const FillOutWrap = styled.ul`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 1rem;
  padding: 0;
  gap: 1rem;
  width: 40%;
  min-width: 300px;
  padding-bottom: 1rem;
`;

export const ReviewWrap = styled.ul`
  margin: 0 auto;

  margin-top: 1rem;
  padding: 0;
  gap: 1rem;
  width: 40%;
  min-width: 300px;
  padding-bottom: 1rem;
`;

export const RejectWrap = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  justify-content: left;
  gap: 1rem;
  align-items: flex-start;
  width: 100%;
`;

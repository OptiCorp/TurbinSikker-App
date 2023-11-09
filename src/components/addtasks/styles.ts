import { Card } from "@equinor/eds-core-react";
import styled from "styled-components";
import { COLORS } from "../../style/GlobalStyles";
export const TitleHeader = styled.div`
  margin: 0 auto;
`;

export const ControllerWrap = styled.div`
  grid-column: 1/2;
  margin: 0 auto;
`;

export const StyledCard = styled(Card)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;
export const customStyles = {
  control: (styles: any) => ({
    ...styles,
    background: "#F7F7F7",
    borderBottom: `1px solid ${COLORS.black}`,
  }),

  option: (styles: any) => ({ ...styles }),
  container: (styles: any) => ({
    ...styles,
    width: 250,
    paddingBottom: "10px",
  }),
  menu: (styles: any) => ({
    ...styles,
    width: "500",
    lineHeight: "20px",
  }),
};

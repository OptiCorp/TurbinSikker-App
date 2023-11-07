import { Chip } from "@equinor/eds-core-react";
import styled from "styled-components";
import { COLORS } from "../../../style/GlobalStyles";

export const StyledChip = styled(Chip)`
  align-items: center;
  width: 100%;
  display: flex;
  justify-content: left;
  align-content: center;
  margin: 0;
`;

export const CellContent = styled.div`
  font-weight: 600;
  -webkit-box-align: center;
  gap: 0.5rem;
  min-height: 50px;
  margin: 10px 0px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

export const CellStatus = styled.div`
  display: flex;
  align-items: left;

  flex-direction: column;
  margin: 0;
`;

export const ListWrapperCheckL = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;
  height: 600px;
  padding-bottom: 50px;
  padding-left: 5px;
  padding-right: 5px;
  margin: 10px 0;
  width: 100vw;
`;

export const StyledHeadContents = styled.h3`
  height: 10px;

  text-align: left;
  width: 100%;
`;

export const Wrap = styled.div`
  display: flex;
  height: min(70vh);
  padding-top: 25px;

  background: ${COLORS.primary};
  align-items: left;
  flex-direction: column;
  padding: 1rem 1rem;
  padding-bottom: 1rem;
`;
export const StyledHeaderCell = styled.div`
  display: flex;
  -webkit-box-align: center;
  textwrap: nowrap;
  flex-direction: column;
`;

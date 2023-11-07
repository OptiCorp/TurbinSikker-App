import { Chip, Tabs } from "@equinor/eds-core-react";
import styled from "styled-components";
import { COLORS } from "../../style/GlobalStyles";

export const FooterContainer = styled.div`
  min-height: 64px;
  width: 100%;
  position: fixed;
  align-items: center;
  display: flex;
  z-index: 0;
  bottom: 0;
  justify-content: space-evenly;
  box-sizing: border-box;
  background: ${COLORS.secondary};
`;

export const FooterContainerHook = styled.div`
  min-height: 64px;
  width: 100%;
  position: fixed;
  bottom: 0;
  box-sizing: border-box;
  background: ${COLORS.secondary};
`;

export const Sidemenu = styled.div`
  min-height: 80vh;
  width: 100%;
  position: sticky;
  right: 0;
  box-sizing: border-box;
  display: grid;
  column-gap: 24px;
  grid-template-columns: auto;
  grid-template-rows: 1fr 1fr 1fr;
  background: ${COLORS.secondary};
`;

export const ImageContainer = styled.div`
  border-bottom: none;
  color: ${COLORS.white};
  margin: 0 auto;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
`;

export const ImageContainerActive = styled.div`
  border-bottom: none;
  color: ${COLORS.activeNavTab};
  margin: 0 auto;
  width: 30vw;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
`;

export const StyledTab = styled.div`
  display: flex;
  color: ${COLORS.white};
  justify-content: center;
  flex-direction: column;
  text-decoration: none;
  width: 100%;
  border-bottom: none;
`;

export const NavigationMainWrap = styled.div`
  border-bottom: none;
  color: ${COLORS.white};
  margin: 1rem 0;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`;
export const StyledList = styled(Tabs.List)`
  display: flex;
  width: 100vw;
  height: 100%;
`;

export const StyledTabs = styled(Tabs)``;

export const StyledChip = styled(Chip)`
  height: 20px;
  padding: 0 8px;
  border-radius: 18px;
  margin-left: 0.2rem;
  position: fixed;
  background-color: ${COLORS.styledChipColor};
  color: ${COLORS.white};
`;

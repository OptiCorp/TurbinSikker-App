import styled from "styled-components";
import { COLORS } from "../../style/GlobalStyles";

export const Wrapper = styled.div`
  margin: 0 auto;
  padding-top: 4rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImageContainer = styled.div`
  margin: 0 auto;
  display: grid;
  align-items: end;
  grid-template-columns: 120px 1fr;
  grid-template-rows: 1fr 50px;
`;
export const Info = styled.div`
  margin: 1rem auto;
  height: 100px;
  min-width: 200px;
  max-width: 400px;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
export const Placeholder = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: ${COLORS.silverGray};
`;

export const ContainerIcon = styled.div`
  margin: 0 auto;
  padding: 5px;
  border-radius: 50%;
  display: flex;
  background: ${COLORS.primary};
`;

export const Image = styled.image`
  border-radius: 50%;
`;

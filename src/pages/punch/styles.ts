import styled from "styled-components";
import { COLORS } from "../../style/GlobalStyles";

export const PunchWrapper = styled.div`
  margin: 0;
  position: relative;
  display: flex;
  flex-direction: column;

  h4 {
    font-weight: normal;
    margin: 0;
  }
`;

export const Container = styled.div``;

export const PunchHeaderWrapper = styled.div`
  padding: 0 20px;
`;

export const PunchHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  align-items: center;
`;

export const PunchUploadContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  position: relative;

  button {
    position: absolute;
    right: 0;
    height: 100%;
    opacity: 50%;
    background-color: transparent;
    border: none;
  }
  img {
    width: 100%;
    max-height: 200px;
    object-fit: contain;
  }
`;

export const SeverityIconContainer = styled.div`
  align-items: center;
  gap: 4;
`;

export const Button = styled.button`
  background-color: ${COLORS.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: 4px;
  width: 100%;
  border: none;
  box-shadow: 0px 4px 4px 0px ${COLORS.gray};
  min-height: 70px;
`;

export const PunchDateContainer = styled.div`
  text-align: right;
  display: flex;
  gap: 4px;
`;

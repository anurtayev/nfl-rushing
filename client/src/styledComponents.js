import styled from "styled-components";

export const ControlPanel = styled.div`
  padding: 1em;
  margin: 1em;
  display: flex;
  justify-content: space-between;
`;

export const Table = styled.div`
  display: grid;
  grid-template-columns: auto repeat(14, 6%);
  border: 1px solid black;
  margin: 1em;
`;

export const Cell = styled.span`
  padding: 0.3em;
  border: 1px solid black;
`;

export const CellLink = styled(Cell)`
  text-decoration: underline;
  color: #80ced6;
`;

export const ControlFilterPrompt = styled.span`
  flex-basis: 10%;
`;

export const ControlFilterInput = styled.input`
  flex-basis: 40%;
  margin-right: 1em;
`;

export const ControlFilterSubmit = styled.button`
  flex-basis: 10%;
  margin-right: 1em;
`;

export const ControlFilterReset = styled.button`
  flex-basis: 10%;
  margin-right: 1em;
`;

export const ControlFilterDownloadLink = styled.a`
  flex-basis: 30%;
`;

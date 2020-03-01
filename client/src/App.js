import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const ENTRIES = gql`
  {
    entries(
      sortBy: "lng"
      filter: "Ma"
      cursor: 82
      pageSize: 10
      direction: "previous"
    ) {
      id
      player
      team
      pos
      attg
      att
      yds
      avg
      ydsg
      td
      lng
      first
      firstPercentage
      twentyPlus
      fortyPlus
      fum
    }

    sortBy @client
    filter @client
  }
`;

export const fieldNames = {
  player: "Player's name",
  team: "Player's team abreviation",
  pos: "Player's postion",
  attg: "Rushing Attempts Per Game Average",
  att: "Rushing Attempts",
  yds: "Total Rushing Yards",
  avg: "Rushing Average Yards Per Attempt",
  ydsg: "Rushing Yards Per Game",
  td: "Total Rushing Touchdowns",
  lng: "Longest Rush",
  first: "Rushing First Downs",
  firstPercentage: "Rushing First Down Percentage",
  twentyPlus: "Rushing 20+ Yards Each",
  fortyPlus: "Rushing 40+ Yards Each",
  fum: "Rushing Fumbles"
};

const ControlPanel = styled.div`
  padding: 1em;
  margin: 1em;
  display: flex;
  justify-content: space-between;
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: auto repeat(14, 6%);
  border: 1px solid black;
  margin: 1em;
`;

const Cell = styled.span`
  padding: 0.3em 0.5em 0.3em 0.5em;
  border: 1px solid black;
`;

const LinkCell = styled.a`
  padding: 0.5em;
  border: 1px solid black;
`;

const HeaderCell = ({ nav, children }) => {
  return nav ? (
    <LinkCell href={nav}>{children}</LinkCell>
  ) : (
    <Cell>{children}</Cell>
  );
};

const ControlFilterPrompt = styled.span`
  flex-basis: 10%;
`;

const ControlFilterInput = styled.input`
  flex-basis: 40%;
  margin-right: 1em;
`;

const ControlFilterSubmit = styled.button`
  flex-basis: 10%;
  margin-right: 1em;
`;

const ControlFilterReset = styled.button`
  flex-basis: 10%;
  margin-right: 1em;
`;

const ControlFilterDownloadLink = styled.a`
  flex-basis: 30%;
`;

export default function App() {
  const { loading, error, data } = useQuery(ENTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {JSON.stringify(error)}</p>;

  return (
    <>
      <ControlPanel>
        <ControlFilterPrompt>filter: </ControlFilterPrompt>
        <ControlFilterInput type="text" defaultValue={data.filter} />
        <ControlFilterSubmit>Apply</ControlFilterSubmit>
        <ControlFilterReset>Reset</ControlFilterReset>
        <ControlFilterDownloadLink href={""} download>
          Download filtered data
        </ControlFilterDownloadLink>
      </ControlPanel>
      <Table>
        <HeaderCell>{fieldNames.player}</HeaderCell>
        <HeaderCell>{fieldNames.team}</HeaderCell>
        <HeaderCell>{fieldNames.pos}</HeaderCell>
        <HeaderCell>{fieldNames.attg}</HeaderCell>
        <HeaderCell>{fieldNames.att}</HeaderCell>
        <HeaderCell>{fieldNames.yds}</HeaderCell>
        <HeaderCell>{fieldNames.avg}</HeaderCell>
        <HeaderCell>{fieldNames.ydsg}</HeaderCell>
        <HeaderCell>{fieldNames.td}</HeaderCell>
        <HeaderCell>{fieldNames.lng}</HeaderCell>
        <HeaderCell>{fieldNames.first}</HeaderCell>
        <HeaderCell>{fieldNames.firstPercentage}</HeaderCell>
        <HeaderCell>{fieldNames.twentyPlus}</HeaderCell>
        <HeaderCell>{fieldNames.fortyPlus}</HeaderCell>
        <HeaderCell>{fieldNames.fum}</HeaderCell>
        {data.entries.map((entry, index) => (
          <TableRow {...entry} key={index} />
        ))}
      </Table>
    </>
  );
}

const TableRow = ({
  player,
  team,
  pos,
  attg,
  att,
  yds,
  avg,
  ydsg,
  td,
  lng,
  first,
  firstPercentage,
  twentyPlus,
  fortyPlus,
  fum
}) => {
  return (
    <>
      <Cell>{player}</Cell>
      <Cell>{team}</Cell>
      <Cell>{pos}</Cell>
      <Cell>{attg}</Cell>
      <Cell>{att}</Cell>
      <Cell>{yds}</Cell>
      <Cell>{avg}</Cell>
      <Cell>{ydsg}</Cell>
      <Cell>{td}</Cell>
      <Cell>{lng}</Cell>
      <Cell>{first}</Cell>
      <Cell>{firstPercentage}</Cell>
      <Cell>{twentyPlus}</Cell>
      <Cell>{fortyPlus}</Cell>
      <Cell>{fum}</Cell>
    </>
  );
};

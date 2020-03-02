import React from "react";
import { useQuery } from "@apollo/react-hooks";
import fieldNames from "./fieldNames.json";
import {
  Table,
  CellLink,
  Cell,
  ControlFilterDownloadLink,
  ControlFilterInput,
  ControlFilterPrompt,
  ControlFilterReset,
  ControlFilterSubmit,
  ControlPanel,
  ControlNav
} from "./styledComponents";
import { ENTRIES, GET_LOCAL_STATE } from "./queries";

export default function App() {
  const { data: localState } = useQuery(GET_LOCAL_STATE);
  let filter, sortBy, filterInput, cursor, direction;
  if (localState) {
    filter = localState.filter;
    sortBy = localState.sortBy;
    filterInput = localState.filterInput;
    cursor = localState.cursor;
    direction = localState.direction;
  }

  console.log("==> cursor", cursor);
  console.log("==> cursor", typeof cursor);

  const { loading, error, data, client } = useQuery(ENTRIES, {
    variables: { sortBy, filter, cursor, direction }
  });

  let entries;
  if (data) {
    entries = data.entries;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {JSON.stringify(error)}</p>;

  return (
    <>
      <ControlPanel>
        <ControlNav
          onClick={() => {
            client.writeData({
              data: {
                cursor: parseInt(entries[0].id),
                direction: "previous"
              }
            });
          }}
        >
          {"<<"}
        </ControlNav>
        <ControlNav
          onClick={() => {
            client.writeData({
              data: {
                cursor: parseInt(entries[entries.length - 1].id),
                direction: "next"
              }
            });
          }}
        >
          {">>"}
        </ControlNav>
        <ControlFilterPrompt>filter:</ControlFilterPrompt>
        <ControlFilterInput
          type="text"
          value={filterInput}
          onChange={event =>
            client.writeData({ data: { filterInput: event.target.value } })
          }
        />
        <ControlFilterSubmit
          onClick={() => client.writeData({ data: { filter: filterInput } })}
        >
          Apply
        </ControlFilterSubmit>
        <ControlFilterReset
          onClick={() => {
            client.writeData({ data: { filter: "", filterInput: "" } });
          }}
        >
          Reset
        </ControlFilterReset>
        <ControlFilterDownloadLink href={""} download>
          Download filtered data
        </ControlFilterDownloadLink>
      </ControlPanel>
      <Table>
        <Cell>{fieldNames.player}</Cell>
        <Cell>{fieldNames.team}</Cell>
        <Cell>{fieldNames.pos}</Cell>
        <Cell>{fieldNames.attg}</Cell>
        <Cell>{fieldNames.att}</Cell>
        {sortBy === "yds" ? (
          <Cell>{fieldNames.yds}</Cell>
        ) : (
          <CellLink
            onClick={() => {
              client.writeData({ data: { sortBy: "yds" } });
            }}
          >
            {fieldNames.yds}
          </CellLink>
        )}
        <Cell>{fieldNames.avg}</Cell>
        <Cell>{fieldNames.ydsg}</Cell>
        {sortBy === "td" ? (
          <Cell>{fieldNames.td}</Cell>
        ) : (
          <CellLink
            onClick={() => {
              client.writeData({ data: { sortBy: "td" } });
            }}
          >
            {fieldNames.td}
          </CellLink>
        )}
        {sortBy === "lng" ? (
          <Cell>{fieldNames.lng}</Cell>
        ) : (
          <CellLink
            onClick={() => {
              client.writeData({ data: { sortBy: "lng" } });
            }}
          >
            {fieldNames.lng}
          </CellLink>
        )}
        <Cell>{fieldNames.first}</Cell>
        <Cell>{fieldNames.firstPercentage}</Cell>
        <Cell>{fieldNames.twentyPlus}</Cell>
        <Cell>{fieldNames.fortyPlus}</Cell>
        <Cell>{fieldNames.fum}</Cell>
        {entries.map((entry, index) => (
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

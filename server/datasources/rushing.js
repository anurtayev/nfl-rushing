import rawData from "./rushing.json";
import _ from "lodash";

const defaultPageSize = process.env.DEFAULT_PAGE_SIZE || 20;

const cleansedData = rawData.map(entry => ({
  player: entry.Player,
  team: entry.Team,
  pos: entry.Pos,
  attg: entry["Att/G"],
  att: entry.Att,
  yds:
    typeof entry.Yds === "string"
      ? parseInt(entry.Yds.replace(/,/g, ""))
      : entry.Yds,
  avg: entry.Avg,
  ydsg: entry["Yds/G"],
  td: entry.TD,
  lng: entry.Lng,
  first: entry["1st"],
  firstPercentage: entry["1st%"],
  twentyPlus: entry["20+"],
  fortyPlus: entry["40+"],
  fum: entry.FUM,
  __sort_Lng:
    typeof entry.Lng === "string" && entry.Lng.includes("T")
      ? parseInt(entry.Lng.replace(/T/g, "")) * 10 + 1
      : entry.Lng * 10
}));

const sortFn = (arr, field) => _.orderBy(arr, field, "asc");
const mapIdFn = (element, index) => ({ id: index, ...element });

const dataSortedByYds = sortFn(cleansedData, "yds").map(mapIdFn);
const dataSortedByLng = sortFn(cleansedData, "__sort_Lng").map(mapIdFn);
const dataSortedByTD = sortFn(cleansedData, "td").map(mapIdFn);

export const getSortedDataSet = sortBy =>
  sortBy === "yds"
    ? dataSortedByYds
    : sortBy === "lng"
    ? dataSortedByLng
    : sortBy === "td"
    ? dataSortedByTD
    : dataSortedByYds;

export const filterData = (data, filter) => {
  if (!data || !Array.isArray(data)) return [];

  return filter ? data.filter(entry => entry.player.includes(filter)) : data;
};

export const paginateData = (data, cursor, direction, pageSize) => {
  if (!data || !Array.isArray(data)) return [];

  if (!cursor || (direction === "next" && cursor === data[data.length - 1].id))
    return data.slice(0, pageSize);

  if (direction === "next") {
    const findCursorIndex = data.findIndex(element => element.id > cursor);
    return data.slice(findCursorIndex, findCursorIndex + pageSize);
  } else {
    const findCursorIndex = data.findIndex(element => element.id === cursor);
    return data.slice(
      findCursorIndex < pageSize ? 0 : findCursorIndex - pageSize,
      findCursorIndex
    );
  }
};

export const getEntries = ({
  sortBy = "yds",
  filter,
  pageSize = defaultPageSize,
  cursor = 0,
  direction = "next"
}) => {
  const sortedData = getSortedDataSet(sortBy);
  const filteredData = filterData(sortedData, filter);
  const paginatedData = paginateData(filteredData, cursor, direction, pageSize);

  return paginatedData;
};

export default {
  getEntries
};

const nameRegex = new RegExp("^[a-zA-Z.' ]*$");
export const sanitizeInput = ({ filter = "", sortBy = "yds" }) => ({
  sanitizedFilter: nameRegex.test(filter) ? filter : "",
  sanitizedSortBy: ["yds", "td", "lng"].some(element => sortBy === element)
    ? sortBy
    : "yds"
});

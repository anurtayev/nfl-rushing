import rushingJson from "./rushing.json";
import { getCsv, getEntries } from "./rushing";

describe("getEntries", () => {
  it("should return data sorted correctly, sortBy=yds, filter='', pageSize=10", () => {
    const result = getEntries({
      sortBy: "yds",
      filter: "",
      pageSize: 10,
      cursor: 0,
      direction: "next"
    });

    expect(result.length).toEqual(10);
    expect(result[0].player).toEqual("Sam Koch");
    expect(result[9].player).toEqual("Brandon Burks");
  });

  it("should return data sorted correctly, sortBy=td, filter='', pageSize=5", () => {
    const result = getEntries({
      sortBy: "td",
      filter: "",
      pageSize: 5,
      cursor: 0,
      direction: "next"
    });

    expect(result.length).toEqual(5);
    expect(result[0].player).toEqual("Joe Banyard");
    expect(result[4].player).toEqual("Lucky Whitehead");
  });

  it("should return data sorted correctly, sortBy=lng, filter='', pageSize=15", () => {
    const result = getEntries({
      sortBy: "lng",
      filter: "",
      pageSize: 15,
      cursor: 0,
      direction: "next"
    });

    expect(result.length).toEqual(15);
    expect(result[0].player).toEqual("Taiwan Jones");
    expect(result[14].player).toEqual("Ryan Mallett");
  });

  it("should return data sorted correctly if no parameters specified", () => {
    const result = getEntries({});

    expect(result.length).toEqual(20);
    expect(result[0].player).toEqual("Sam Koch");
    expect(result[14].player).toEqual("Drew Stanton");
  });

  it("should return data sorted and paginated correctly, cursor=100", () => {
    const result = getEntries({ cursor: 100 });

    expect(result.length).toEqual(20);
    expect(result[0].player).toEqual("Russell Shepard");
    expect(result[14].player).toEqual("Tom Savage");
  });
});

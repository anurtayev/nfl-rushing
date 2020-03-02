export default {
  Query: {
    entries: async (
      _,
      { sortBy, filter, pageSize, cursor, direction },
      { dataSources }
    ) => {
      return await dataSources.rushingAPI.getEntries({
        sortBy,
        filter,
        pageSize,
        cursor,
        direction
      });
    },

    csv: async (_, { sortBy, filter }, { dataSources }) => {
      return await dataSources.rushingAPI.getCsv({
        sortBy,
        filter
      });
    }
  }
};

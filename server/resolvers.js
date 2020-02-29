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
    }
  }
};

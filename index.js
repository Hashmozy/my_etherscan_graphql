// Import Apollo Server and Schema
const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");

// Import Custom Data Source
const EtherDataSource = require("./datasource/ethDatasource");

// Import Schema
const typeDefs = importSchema("./schema.graphql");

// Load environmental variable
require("dotenv").config();

// Resolvers query custom data source
const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create Apollo Server instances with schema, resolvers and data source
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
  }),
});

// Start Apollo Server
server.timeout = 0;
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: "link-01",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  }
];
let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, { id }) => links.find(link => link.id === id)
  },

  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },
    update: (parent, args) => {
      console.log("args are", args);
      const i = links.findIndex(link => link.id === args.id);
      links[i] = args;
      return links[i];
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));

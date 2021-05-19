const dbSetup = require("./db/db-setup");
const Note = require("./model/note");
const { ApolloServer, gql } = require("apollo-server");
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Note" type defines the queryable fields for every book in our data source.
  type Note {
    id: ID
    title: String
    content: String
    created_at: String
    updated_at: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    notes: [Note]
    note(id: ID): Note
  }
  type Mutation {
    addNote(title: String, content: String): Note
    updateNote(id:ID ,title: String, content: String): Note
    deleteNote(id:ID): Note
  }
`;

dbSetup();

const resolvers = {
  Query: {
    notes: async () => {
      return Note.query();
    },
    note: async (parent, args, context, info) => {
      const note = Note.query().findById(args.id);
      return note;
    },
  },
  Mutation: {
    addNote: async (parent, note) => {
      return Note.query().insert(note);
    },
    updateNote: async (parent, note) => {
      return Note.query().patchAndFetchById(note.id,note);
    },
    deleteNote: async(parent, note) => {
      return Note.query().deleteById(note.id);
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

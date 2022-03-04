import admin from 'firebase-admin';

import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

// initialize app once
admin.initializeApp();

const db = admin.firestore();

// TODO: Refactor that POC

const typeDefs = gql`
  type User {
    firstName: String
    lastName: String
    email: String
  }
  type Query {
    users: [User]
  }
`;

const fetchAllUsers = async (callback: any) => {
  db.collection('oura')
    .get()
    .then((item: any) => {
      const items: any = [];
      console.log({ item });
      item.docs.forEach((t: any) => {
        console.log({ t });
        items.push(t.data());
      });
      return callback(items);
    })
    .catch((e: any) => console.log(e));
};

const resolvers = {
  Query: {
    users: () => new Promise((resolve) => {
      fetchAllUsers((data: any) => {
        resolve(data);
      });
    }),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

server.start().then(() => {
  server.applyMiddleware({ app, path: '/' });
});

export default app;

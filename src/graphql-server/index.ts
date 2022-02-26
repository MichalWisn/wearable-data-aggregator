// For accessing Firestore database
import admin from 'firebase-admin';

import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

// Will initialize with default settings and database
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
      item.docs.forEach((item: any) => {
        console.log({ item });
        items.push(item.data());
      });
      return callback(items);
    })
    .catch((e: any) => console.log(e));
};

const resolvers = {
  Query: {
    users: () => {
      return new Promise((resolve, reject) => {
        fetchAllUsers((data: any) => {
          resolve(data);
        });
      });
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

server.start().then(() => {
  server.applyMiddleware({ app, path: '/' });
});

export default app;

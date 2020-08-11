import { ApolloServer } from 'apollo-server-express';
import express, { Express } from 'express';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { Connection, useContainer } from 'typeorm';
import { initialiseConnection } from './database';
import { getEnvVariable } from './environment';
import { UserResolver } from './resolvers'

useContainer(Container);

export const bootstrap = async (): Promise<{ app: Express; connection: Connection }> => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    container: Container
  });

  const connection = await initialiseConnection({
    type: getEnvVariable('DATABASE_TYPE'),
    database: getEnvVariable('DATABASE_NAME'),
    username: getEnvVariable('DATABASE_USER', false),
    password: getEnvVariable('DATABASE_PASSWORD', false),
    host: getEnvVariable('DATABASE_HOST', false)
  });

  const server = new ApolloServer({ schema });
  const app = express();

  server.applyMiddleware({ app });

  return { app, connection };
}

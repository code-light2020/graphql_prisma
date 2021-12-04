import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./graphql/user/userResolver";
import express from "express";

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: true,
  });

  const app = express();

  const server = new ApolloServer({
    schema,
  });
  await server.start()
  server.applyMiddleware({ app, path: "/api" });
  app.listen(3333, () => console.log("is runnig"));
}

bootstrap()
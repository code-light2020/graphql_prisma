import {
  Mutation,
  Query,
  Resolver,
  Arg,
  FieldResolver,
  Root,
  InputType,
  Field,
} from "type-graphql";
import { UserType as User } from "./userType";
import { prismaClient } from "../../service/prismaClient";

@InputType()
class UserInput {
  @Field()
  name!: string;
  @Field()
  email!: string;
}

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users() {
    const userList = await prismaClient.user.findMany();
    return userList;
  }
  @FieldResolver(() => String)
  async nameEmail(@Root() parent: User) {
    return `email:${parent.email} e name:${parent.name}`;
  }

  @Mutation(() => User)
  async register(@Arg("user") user: UserInput) {
    const newUser = await prismaClient.user.create({
      data: user,
    });

    return newUser;
  }
}

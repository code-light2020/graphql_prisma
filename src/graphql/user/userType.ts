import { Field, ObjectType, ID, Int, Float } from "type-graphql";

@ObjectType()
export class UserType {
  @Field(() => ID)
  id!: number;
  @Field()
  name?: string;
  @Field()
  email!: string;
}

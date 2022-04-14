import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCatInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

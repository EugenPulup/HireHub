import { InputType, Field, registerEnumType } from '@nestjs/graphql';

enum Fields {
  yearsOfExperience = 'yearsOfExperience',
  salaryExpectation = 'salaryExpectation',
  age = 'age',
  typeOfWork = 'typeOfWork',
  position = 'position',
}

registerEnumType(Fields, {
  name: 'Fields',
});

@InputType()
export class GroupAnalyticInput {
  @Field(() => Fields, { nullable: false })
  field: Fields;
}

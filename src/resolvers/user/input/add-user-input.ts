import { InputType, Field } from 'type-graphql';
import { User } from '../../../models/user';
import { IsNotEmpty, IsString, Length, IsEmail } from 'class-validator';

@InputType()
export class AddUserInput implements Partial<User> {
  @Field()
  @IsNotEmpty()
  @IsString()
  @Length(1, 64)
  username!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Length(1, 320)
  emailAddress!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @Length(1, 64)
  password!: string;
}

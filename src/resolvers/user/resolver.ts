import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User } from '../../models';
import { AddUserInput } from './input/add-user-input';
import { hash } from 'bcrypt';

@Resolver(() => User)
export class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {};

  @Query(() => User, { nullable: true })
  async user(@Arg('id', () => String) id: string): Promise<User | undefined> {
    return await this.userRepository.findOne(id);
  }

  @Query(() => [User])
  async allUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  @Mutation(() => User)
  async addUser(@Arg('data') { username, emailAddress, password }: AddUserInput): Promise<User> {
    const passwordHash = await hash(password, 12);

    const newUser = this.userRepository.create({
      username,
      emailAddress,
      passwordHash
    });

    return this.userRepository.save(newUser);
  };
}

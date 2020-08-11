import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, BaseEntity, Unique } from "typeorm";
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
@Unique('UQ_USER_USERNAME', ['username'])
@Unique('UQ_USER_EMAILADDRESS', ['emailAddress'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field()
  @Column()
  readonly username!: string;

  @Field()
  @Column()
  readonly emailAddress!: string;

  @Column()
  readonly passwordHash!: string;

  @Field()
  @UpdateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
  readonly updatedAt!: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
  readonly createdAt!: string;
}

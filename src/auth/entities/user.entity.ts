import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEmail, IsInt, Length, Max, Min } from 'class-validator';

export enum Role {
    ADMIN = 'admin',
    USER = 'user',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(4, 20)
  username: string;

  @Column()
  @IsInt()
  @Min(2)
  @Max(100)
  age: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @Length(6, 50)
  password: string;

  @Column({type: 'varchar', default: Role.USER})
  role:Role;
}
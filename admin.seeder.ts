import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { User } from './src/auth/entities/user.entity';
import { Role } from './src/auth/entities/user.entity';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

async function seedAdmin() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  const userRepository = dataSource.getRepository(User);

  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASS!, 10);
  const adminUser = userRepository.create({
    username: process.env.ADMIN_USERNAME,
    email: process.env.ADMIN_EMAIL,
    age: 30,
    password: hashedPassword,
    role: Role.ADMIN,
  });

  await userRepository.save(adminUser);
  console.log('Admin user seeded successfully!');

}

seedAdmin().catch((err) => console.error(err));

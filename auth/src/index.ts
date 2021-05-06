import 'reflect-metadata';
import { app } from './app';
import { createConnection, ConnectionOptions } from 'typeorm';
import { UserSubscriber } from './subscribers';
import { UserEntity } from './enties/User.entity';

const connectionOptions: ConnectionOptions = {
  type: 'mongodb',
  url: process.env.MONGO_URI,
  migrationsRun: true,
  synchronize: true,
  logging: false,
  entities: [UserEntity],
  subscribers: [UserSubscriber]
};

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await createConnection(connectionOptions);
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!');
  });
};

start();

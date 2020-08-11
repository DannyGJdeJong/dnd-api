import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import migrations from './migrations';
import { User } from './models';

interface DatabaseOptions {
  type: string;
  database: string;
  username?: string;
  password?: string;
  host?: string;
  port?: number;
}

export const initialiseConnection = async (options: DatabaseOptions): Promise<Connection> => {
  const connection = await createConnection({
    ...options,
    entities: [User],
    migrations,
    migrationsRun: true,
    synchronize: true,
    logging: true
  } as ConnectionOptions);

  await connection.runMigrations();

  return connection;
}

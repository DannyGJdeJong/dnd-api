import 'reflect-metadata';
import { bootstrap } from './server';

bootstrap()
  .then(({ app }) => {
    app.listen(8000);
  })
  .catch(console.error);

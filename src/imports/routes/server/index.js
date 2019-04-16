import task from './task';
import step from './step';
import user from './user';

const routes = (app) => {
  app.use('/task', task);
  app.use('/step', step);
  app.use('/user', user);
};
export default routes;

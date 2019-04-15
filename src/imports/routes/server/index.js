import task from './task';

const routes = (app) => {
  app.use('/task', task);
};
export default routes;

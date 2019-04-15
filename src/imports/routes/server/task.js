module.exports = (app) => {
  app.post('/', (req, res) => {
    console.log('task', req);
    res.send('OK');
  });
};

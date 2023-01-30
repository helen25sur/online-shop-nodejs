const express = require('express');
const app = express();
const port = 3000;

app.use((req, res, next) => {
  console.log('It\'s always run');
  next();
});

app.use((req, res, next) => {
  console.log('The second middleware');
  next();
});

app.get('/users', (req, res, next) => {
  console.log(req.url);
  res.write('<html><head><title>Users</title></head><body><h1>Page of Users</h1></body></html>')
});

app.get('/', (req, res, next) => {
  console.log(req.url);
  res.write('<html><head><title>Express</title></head><body><h1>Hello from Express!</h1></body></html>')
});


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});
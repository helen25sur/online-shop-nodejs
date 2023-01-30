const { join } = require('path');

const express = require('express');
const app = express();
const port = 3000;

const shopRouter = require('./routes/shop');
const adminRouter = require('./routes/admin');

app.use(express.static('public'));

app.use(adminRouter);

app.use(shopRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(join(__dirname, 'views', '404.html'));
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});
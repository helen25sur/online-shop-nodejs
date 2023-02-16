const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

const shopRouter = require('./routes/shop');
const adminRouter = require('./routes/admin');
const errorsRouter = require('./routes/errors');

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/admin', adminRouter);

app.use(shopRouter);

app.use(errorsRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});
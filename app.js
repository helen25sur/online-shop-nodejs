const { join } = require('path');

const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

const shopRouter = require('./routes/shop');
const adminData = require('./routes/admin');

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/admin', adminData.routes);

app.use(shopRouter);

app.use((req, res, next) => {
  res.status(404).render('404', {pageTitle: 'Page Not Found', path: ''});
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});
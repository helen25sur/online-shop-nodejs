const express = require('express');

const sequelize = require('./db/database');
const Product = require('./models/product');
const User = require('./models/user');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

const shopRouter = require('./routes/shop');
const adminRouter = require('./routes/admin');
const errorsRouter = require('./routes/errors');

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));



app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.error(err);
    })
})

app.use('/admin', adminRouter);

app.use(shopRouter);

app.use(errorsRouter);

Product.belongsTo(User, {
  constrains: true,
  onDelete: 'CASCADE'
});

User.hasMany(Product);

sequelize
  .sync()
  .then(result => {
    return User.findByPk(1);
  })
  .then(user => {
    if(!user) {
      return User.create({name: 'Olena', email: 'test@test.com'})
    }
    return user;
  })
  .then(user => {
    // console.log(user);
     app.listen(port, () => {
       console.log(`App listening on port ${port}`)
    });
  })
  .catch(err => {
    console.error(err);
  })


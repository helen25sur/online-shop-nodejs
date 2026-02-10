const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = require('./db/database');

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

const shopRouter = require('./routes/shop');
const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth');
const errorsRouter = require('./routes/errors');

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// app.use(session({
//   secret: 'this is a line of my secret',
//   resave: false,
//   saveUninitialized: false
// }));

const myStore = new SequelizeStore({
  db: sequelize,
  checkExpirationInterval: 15 * 60 * 1000, // Очищати застарілі сесії кожні 15 хвилин
  expiration: 24 * 60 * 60 * 1000  // Сесія живе 24 години
});

app.use(session({
  secret: 'this is a line of my secret',
  store: myStore,
  resave: false, // Для цього пакету рекомендується false
  saveUninitialized: false,
  proxy: true // Якщо будете деплоїти на Render, це може знадобитися для кукі
}));

app.use((req, res, next) => {
  // res.locals дозволяє встановлювати змінні, які будуть доступні в усіх .ejs файлах
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});

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

app.use(authRouter);

app.use(errorsRouter);

// Product association
Product.belongsTo(User, {
  constrains: true,
  onDelete: 'CASCADE'
});
Product.belongsToMany(Cart, { through: CartItem });

// User association
User.hasMany(Product);
User.hasOne(Cart);
User.hasMany(Order);

// Cart association
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });

// Order association
Order.belongsTo(User);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  .sync()
  // .sync({ force: true })
  .then(result => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Olena', email: 'test@test.com' })
    }
    console.log(user);
    return user;
  })
  .then(user => {
    return user.getCart().then(cart => {
      if (!cart) {
        return user.createCart();
      }
      return cart;
    });
  })
  .then(cart => {
    // console.log(user);
    app.listen(port, () => {
      console.log(`App listening on port ${port}`)
    });
  })
  .catch(err => {
    console.error(err);
  })


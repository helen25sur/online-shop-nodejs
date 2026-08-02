const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const { generateToken, invalidCsrfTokenError } = require('./utils/csrf');
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
  proxy: true, // Якщо будете деплоїти на Render, це може знадобитися для кукі
  cookie: { secure: false }
}));

app.use((req, res, next) => {
  // res.locals дозволяє встановлювати змінні, які будуть доступні в усіх .ejs файлах
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findByPk(req.session.user.id)
    .then(user => {
      // Тут ми записуємо повноцінний об'єкт Sequelize в req.user
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use((req, res, next) => {
  res.locals.csrfToken = generateToken(req);
  next();
});

app.use('/admin', adminRouter);

app.use(shopRouter);

app.use(authRouter);


app.use((error, req, res, next) => {
  if (error === invalidCsrfTokenError) {
    return res.status(403).render('./errors/403', {
      pageTitle: 'Forbidden',
      path: './403',
      message: 'Форма застаріла або сесія закінчилась. Спробуйте ще раз.',
      csrfToken: res.locals.csrfToken
    });
  }
  next(error);
});

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
  .then(() => {
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch(err => console.error(err));

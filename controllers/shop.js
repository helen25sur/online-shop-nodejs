const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index',
        {
          pageTitle: 'Candleaf',
          prods: products,
          path: '/',
          csrfToken: res.locals.csrfToken
        }
      );
    })
    .catch(err => {
      console.error(err);
    })

}

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/product-list',
        {
          pageTitle: 'Products',
          prods: products,
          path: '/products',
          csrfToken: res.locals.csrfToken
        }
      );
    })
    .catch(err => {
      console.error(err);
    });
}

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then(product => {
      res.render('shop/product-detail',
        {
          pageTitle: product.title,
          product: product,
          path: '/products',
          csrfToken: res.locals.csrfToken
        }
      );
    })
    .catch(err => {
      console.log(err);
    });
}

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(cart => {
      return cart.getProducts()
        .then(cartProducts => {
          console.log(cartProducts);
          res.render('shop/cart.ejs', {
            path: '/cart',
            pageTitle: 'Your cart',
            products: cartProducts,
            totalPrice: cart.totalPrice,
            csrfToken: res.locals.csrfToken
          });
        })
        .catch(err => {
          console.error(err);
        })
    })
    .catch(err => {
      console.error(err);
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => {
      console.error(err);
    })
};

exports.deleteCartItem = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId } })
    })
    .then(products => {
      const product = products[0];
      product.cartItem.destroy();
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => {
      console.error(err);
    });
}

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      return req.user
        .createOrder()
        .then(order => {
          // Важливо: повертаємо результат addProducts
          return order.addProducts(
            products.map(product => {
              // Вказуємо через яку таблицю (OrderItem) і які дані додати
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        });
    })
    .then(result => {
      return fetchedCart.setProducts(null);
    })
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
}

exports.getOrders = (req, res, next) => {
  req.user.getOrders({ include: [Product] })
    .then(orders => {
      console.log(orders[0]);
      res.render('shop/orders',
        {
          pageTitle: 'Your Orders',
          path: '/orders',
          orders: orders,
          csrfToken: res.locals.csrfToken
        }
      );

    })
};
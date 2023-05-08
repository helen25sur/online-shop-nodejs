const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
Product.fetchAllProducts((products) => {
  res.render('shop/index', 
    { 
      pageTitle: 'Candleaf', 
      prods: products, 
      path: '/' 
    }
  );
});
}

exports.getProducts = (req, res, next) => {
  Product.fetchAllProducts((products) => {
    res.render('shop/product-list',
      {
        pageTitle: 'Products',
        prods: products,
        path: '/products'
      }
    );
  });
}

exports.getCart = (req, res, next) => {
  res.render('shop/cart', 
    {
      pageTitle: 'Your Cart', 
      path: '/cart'
    }
  );
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', 
    {
      pageTitle: 'Checkout', 
      path: '/checkout'
    }
  );
};
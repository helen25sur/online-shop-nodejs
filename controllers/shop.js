const { redirect } = require('express/lib/response');
const Product = require('../models/product');
const Cart = require('../models/cart');

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

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render('shop/product-detail',
      {
        pageTitle: product.title,
        product: product,
        path: '/products'
      }
    );
  });
}

exports.getCart = (req, res, next) => {
  Cart.fetchAllCartProducts((cart) => {
    const products = [];
    Product.fetchAllProducts(allProducts => {
      for (let prod of allProducts) {
        if(cart.products.find(p => p.id === prod.id)) {
          products.push({ ...prod, qty: cart.products.find(p => p.id === prod.id).qty });
        }
      }
      console.log('54', products);
      res.render('shop/cart.ejs', {
        path: '/cart',
        pageTitle: 'Your cart',
        products: products
      });
    });
      
    
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  })
  res.redirect('/cart');
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders',
    {
      pageTitle: 'Your Orders',
      path: '/orders'
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
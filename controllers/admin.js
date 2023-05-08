const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', 
    {
      pageTitle: 'Add Product', 
      path: '/admin/add-product'
    }
  );
};

exports.postNewProduct = (req, res, next) => {
  const {title, imageUrl, price, description} = req.body;
  const product = new Product(title, imageUrl, price, description);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAllProducts((products) => {
    res.render('admin/products',
      {
        pageTitle: 'Admin Products',
        prods: products,
        path: '/admin/products'
      }
    );
  });
};
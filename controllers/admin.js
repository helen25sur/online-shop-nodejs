const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product',
    {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false,
    }
  );
};

exports.postNewProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const date = new Date();
  const formatter = new Intl.DateTimeFormat('sv-SE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
  const product = new Product(null, title, price, description, imageUrl, formatter);
  product.save()
    .then(() => {
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    })
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product',
      {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        product: product,
        editing: editMode
      }
    );
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedPrice, updatedDesc);
  updatedProduct.save();
  res.redirect('/admin/products');
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect('/admin/products');
}

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
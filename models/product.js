const db = require('../db/database');

const Cart = require('./cart');

module.exports = class Product {
  constructor(id, title, price, description, imgUrl, date) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.imgUrl = imgUrl;
    this.date = date;
  }

  save() {
   return db.execute('INSERT INTO products (title, price, description, imgUrl, date) VALUES (?, ?, ?, ?, ?)', 
      [this.title, this.price, this.description, this.imgUrl, this.date]
    )
  }

  static fetchAllProducts() {
    return db.execute('SELECT * FROM products;');
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  }

  static deleteById(id) {
    
  }
}
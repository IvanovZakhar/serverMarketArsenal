const mongoose = require('mongoose');

// Определение схемы
const productForOrdersSchema = new mongoose.Schema({
    article: String,
    name: String,
    weight: Number,
    width: Number,
    height: Number,
    loops: Number,
    screws: Number,
    threaded_insert: Number,
    Accordion: Number,
    eyelet: Number,
    Station: Number,
    Column14: String,
    Column15: String,
    Column16: String,
    Column17: String,
    Column18: String,
    Column19: String,
    Column20: String,
    Column21: String,
    Column22: String,
    Column23: String,
    Column24: String,
    Column25: String,
  });
  
  // Создание модели на основе схемы
  const ProductForOrders = mongoose.model('products_for_orders', productForOrdersSchema, 'products_for_orders');
  
  module.exports = ProductForOrders;
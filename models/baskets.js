const mongoose = require('mongoose');
 
// Определение схемы для коллекции baskets
const basketSchema = new mongoose.Schema({
    number: Number,
    article: String,
    name_of_product: String,
    price_rubles: Number,
    nds: String,
    commercial_type: String,
    barcode_serial_number_ean: String,
    weight_in_packaging_g: Number,
    width_in_packaging_mm: Number,
    height_in_packaging_mm: Number,
    length_in_packaging_mm: Number,
    main_photo_link: String,
    additional_photo_links: String,
    brand: String,
    model_name_for_merging_into_one_card: String,
    product_color: String,
    color_name: String,
    quantity_in_packaging: Number,
    type: String,
    annotation: String,
    supported_brands: String,
    purpose: String,
    list_of_compatible_devices: String,
    material: String,
    package_contents: String,
    country_of_manufacture: String,
    dimensions_mm: String,
    product_weight_g: Number,
    warranty_period: String,
    number_of_factory_packages: Number
  });
  
  // Создание модели для коллекции baskets
  const Baskets = mongoose.model('baskets', basketSchema, 'baskets');

  module.exports = Baskets;
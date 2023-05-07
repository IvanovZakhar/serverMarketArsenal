const mongoose = require('mongoose');

// Определение схемы для коллекции flags
const flagSchema = new mongoose.Schema({
    number: Number,
    article: String,
    name_of_product: String,
    price_rubles: Number,
    price_before_discount: Number,
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
    quantity_in_packaging: Number,
    width_cm: Number,
    length_cm: Number,
    type: String,
    annotation: String,
    keywords: String,
    package_contents: String,
    height_cm: Number,
    material: String,
    product_weight_g: Number,
    for_whom: String,
    warranty_period: String,
    country_of_manufacture: String,
    product_release_type: String,
    number_of_factory_packages: Number
  });
  
  // Модель для коллекции flags
  const Flag = mongoose.model('flags', flagSchema);

  module.exports = Flag;
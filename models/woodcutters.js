const mongoose = require('mongoose');

// Определение схемы для коллекции "Woodcutters"
const woodcutterSchema = new mongoose.Schema({
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
  model_name_for_merging_into_one_card: Number,
  product_color: String,
  units_per_item: Number,
  length_cm: Number,
  type: String,
  package_contents: String,
  annotation: String,
  keywords: String,
  material: String,
  firewood_rack_type: String,
  width_cm: Number,
  height_cm: Number,
  dimensions_mm: String,
  warranty_period: String,
  country_of_manufacture: String,
  product_release_type: String,
  number_of_factory_packages: Number,
  error: String
});

// Создание модели "Woodcutter" на основе схемы "woodcutterSchema"
const Woodcutter = mongoose.model('woodcutters', woodcutterSchema);

module.exports = Woodcutter;
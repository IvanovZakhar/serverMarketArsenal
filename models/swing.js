const mongoose = require('mongoose');

const swingSchema = new mongoose.Schema({
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
  additional_photo_links: [String],
  brand: String,
  merge_on_one_card: String,
  product_color: String,
  color_name: String,
  type: String,
  length_cm: Number,
  width_cm: Number,
  model_name_for_merging_into_one_card: String,
  country_of_manufacture: String,
  model_name_for_naming_template: String,
  annotation: String,
  number_of_seats: Number,
  frame_material: String,
  package_contents: String,
  delivery_form: String,
  product_weight_g: Number,
  warranty_period: String,
  number_of_factory_packages: Number,
  product_release_type: String
});

const Swing = mongoose.model('swing', swingSchema, 'swing');


module.exports = Swing;
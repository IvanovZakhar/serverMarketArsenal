const mongoose = require('mongoose');

const pergoliasSchema = new mongoose.Schema({
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
  model_name_for_merging_into_one_card: String,
  color_of_product: String,
  units_in_one_product: Number,
  length_mm: Number,
  width_mm: Number,
  height_mm: Number,
  thickness_mm: Number,
  type: String,
  annotation: String
});

const Pergolias = mongoose.model('pergolias', pergoliasSchema);

module.exports = Pergolias;

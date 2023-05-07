const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const antiTheftSchema = new Schema({
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
  model_name_for_merging_into_one_card: String,
  brand: String,
  quantity_pieces: Number,
  remote_start: String,
  type: String,
  country_of_manufacture: String,
  product_hazard_class: String,
  feedback: String,
  plan_to_deliver_product_in_multiple_packages: String,
  working_humidity: String,
  anti_theft_device_type: String,
  vehicle_make: String,
  annotation: String,
  security_features: String,
  device_type: String,
  operation_modes: String
});

const AntiTheft = mongoose.model('AntiTheft', antiTheftSchema, 'anti-theft');


module.exports = AntiTheft;

const mongoose = require('mongoose');

const birdhouseSchema = new mongoose.Schema({
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
    color_name: String,
    type: String,
    plan_to_deliver_product_in_multiple_packages: String,
    annotation: String,
    height_cm: Number,
    length_cm: Number,
    width_cm: Number,
    feeder_placement: String,
    material: String,
    country_of_manufacture: String,
    number_of_factory_packages: Number
  });

  const Birdhouse = mongoose.model('birdhouses', birdhouseSchema);

  module.exports = Birdhouse;
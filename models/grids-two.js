const mongoose = require('mongoose');

// Определение схемы для коллекции grids
const gridSchema = new mongoose.Schema({
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
    variant: String,
    units_per_item: Number,
    product_color: String,
    height_mm: Number,
    width_mm: Number,
    type: String,
    package_contents: String,
    shape: String,
    grille_design: String,
    warranty: String,
    annotation: String,
    product_weight_g: Number,
    opening_type: String,
    opening_direction: String,
    number_of_leafs: Number,
    number_of_chambers: Number,
    country_of_manufacture: String,
    number_of_factory_packages: Number,
    categories: [
      {
          name: String,
          link: String
      }
    ]
  });
  
  // Модель для коллекции grids
  const GridsTwo = mongoose.model('grids_two', gridSchema, 'grids_two');

  module.exports = GridsTwo;


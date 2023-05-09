const AntiTheft = require('./../models/antiTheft');
const Baskets = require('./../models/baskets');
const Birdhouses = require('./../models/birdhouses');
const Flags = require('./../models/flags');
const Grids = require('./../models/grids');
const GridsTwo = require('./../models/grids-two');
const Pergolias = require('./../models/pergolias');
const Swing = require('./../models/swing')
const Visors = require('./../models/visors')
const Woodcutters = require('./../models/woodcutters')
 

// Получение данных для модели Visor
const getVisorsData = async () => {
  try {
    const visors = await Visors.find({}, 'article name_of_product price_rubles annotation price_before_discount main_photo_link');
    return visors;
  } catch (error) {
    console.error('Ошибка при получении данных из коллекции visors:', error);
    throw error;
  }
};

// Получение данных для модели Baskets
const getBasketsData = async () => {
  try {
    const baskets = await Baskets.find({}, 'article name_of_product price_rubles annotation price_before_discount main_photo_link');
    return baskets;
  } catch (error) {
    console.error('Ошибка при получении данных из коллекции baskets:', error);
    throw error;
  }
};

// Получение данных для модели AntiTheft
const getAntiTheftData = async () => {
  try {
    const antiTheft = await AntiTheft.find({}, 'article name_of_product price_rubles annotation price_before_discount main_photo_link');
    return antiTheft;
  } catch (error) {
    console.error('Ошибка при получении данных из коллекции antiTheft:', error);
    throw error;
  }
};

// Получение данных для модели Birdhouses
const getBirdhousesData = async () => {
  try {
    const birdhouses = await Birdhouses.find({}, 'article name_of_product price_rubles annotation price_before_discount main_photo_link');
    return birdhouses;
  } catch (error) {
    console.error('Ошибка при получении данных из коллекции birdhouses:', error);
    throw error;
  }
};

// Получение данных для модели Flags
const getFlagsData = async () => {
  try {
    const flags = await Flags.find({}, 'article name_of_product price_rubles annotation price_before_discount main_photo_link');
    return flags;
  } catch (error) {
    console.error('Ошибка при получении данных из коллекции flags:', error);
    throw error;
  }
};

// Получение данных для модели Grids
const getGridsData = async () => {
  try {
    const grids = await Grids.find({}, 'article name_of_product price_rubles annotation price_before_discount main_photo_link');
    return grids;
  } catch (error) {
    console.error('Ошибка при получении данных из коллекции grids:', error);
    throw error;
  }
};

const getGridsTwoData = async () => {
  try {
    const gridsTwo = await GridsTwo.find({}, 'article name_of_product price_rubles annotation price_before_discount main_photo_link');
    return gridsTwo;
  } catch (error) {
    console.error('Ошибка при получении данных из коллекции grids:', error);
    throw error;
  }
};

// Получение данных для модели Pergolias
const getPergoliasData = async () => {
  try {
    const pergolias = await Pergolias.find({}, 'article name_of_product price_rubles annotation price_before_discount main_photo_link');
    return pergolias;
  } catch (error) {
    console.error('Ошибка при получении данных из коллекции pergolias:', error);
    throw error;
  }
};

// Получение данных для модели Swing
const getSwingData = async () => {
  try {
    const swing = await Swing.find({}, 'article name_of_product price_rubles annotation price_before_discount main_photo_link');
    return swing;
  } catch (error) {
    console.error('Ошибка при получении данных из коллекции swing:', error);
    throw error;
  }
};


// Получение данных для модели Woodcutters
const getWoodcuttersData = async () => {
  try {
    const woodcutters = await Woodcutters.find({}, 'article name_of_product price_rubles annotation price_before_discount main_photo_link');
    return woodcutters;
  } catch (error) {
    console.error('Ошибка при получении данных из коллекции woodcutters:', error);
    throw error;
  }
};

module.exports = {
  getVisorsData,
  getBasketsData,
  getAntiTheftData,
  getWoodcuttersData,
  getSwingData,
  getPergoliasData,
  getGridsData,
  getFlagsData,
  getBirdhousesData,
  getGridsTwoData

};

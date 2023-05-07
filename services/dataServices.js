// dataService.js

const { VisorsProduct, WoodcutterProduct } = require('./../models/allProducts');

// ...

async function getAllData() {
  try {
    const visorstData = await Visors.find({}, { _id: 0, __v: 0 });
    const woodcutterData = await Woodcutter.find({}, { _id: 0, __v: 0 });

    const mergedData = [...visorstData, ...woodcutterData];

    return mergedData;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get data from MongoDB');
  }
}

 

module.exports = {
  getAllData
};

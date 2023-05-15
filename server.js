// const express        = require('express');
// const MongoClient    = require('mongodb').MongoClient;
// const bodyParser     = require('body-parser');
// const app            = express();

// const port = 8000;
// app.use(bodyParser.urlencoded({ extended: true }));
 

const { request } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const AntiTheft = require('./models/antiTheft');
const Baskets = require('./models/baskets');
const Birdhouses = require('./models/birdhouses');
const Flags = require('./models/flags');
const Grids = require('./models/grids');
const GridsTwo = require('./models/grids-two');
const Pergolias = require('./models/pergolias');
const Swing = require('./models/swing')
const Visors = require('./models/visors')
const Woodcutters = require('./models/woodcutters')
const ProductsForOrders = require('./models/productsForOrders')
const app = express();
const port = process.env.PORT || 3001 ;
app.use(express.json());

 
const {   
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
      } = require('./services/dataServices');




// Подключение к базе данных

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/Arsenal';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Дополнительный код вашего приложения
  })
  .catch(error => {
    console.log(typeof uri)
    console.error('Error connecting to MongoDB:', error);
  });
 

 

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  
    next();
  });
  

app.get('/allproducts', async (req, res) => {
  try {
    const visors = await getVisorsData();
    const baskets = await getBasketsData();
    const antiTheft = await getAntiTheftData();
    const woodcutters = await getWoodcuttersData();
    const swing = await getSwingData();
    const pergolias = await getPergoliasData();
    const gridsOne = await getGridsData();
    const gridsTwo = await getGridsTwoData();
    const flags = await getFlagsData();
    const birdhouses = await getBirdhousesData();

    const allProducts = 
                        [
                          ...visors, 
                          ...baskets, 
                          ...antiTheft, 
                          ...woodcutters, 
                          ...swing, 
                          ...pergolias, 
                          ...flags, 
                          ...birdhouses,
                          ...gridsOne,
                          ...gridsTwo
                        ];

    // Отправляем объединенные данные в виде JSON в ответ на запрос
    res.json(allProducts);
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    // Отправляем ошибку в ответ на запрос
    res.status(500).json({ error: 'Произошла ошибка при получении данных' });
  }
});


app.get('/products-for-orders', (req, res) => {
  ProductsForOrders.find({})
    .then((dataProductsForOrders) => {
      res.json(dataProductsForOrders);
    })
    .catch((error) => {
      console.log('Error retrieving anti-theft data: ', error);
      res.status(500).send('Internal Server Error');
    });
});

app.get('/conditioner-protection', async (req, res) => {
  try {
    const visors = await getVisorsData();
    const baskets = await getBasketsData();
 

    const allProducts = 
                        [
                          ...visors, 
                          ...baskets
                        ];

    // Отправляем объединенные данные в виде JSON в ответ на запрос
    res.json(allProducts);
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    // Отправляем ошибку в ответ на запрос
    res.status(500).json({ error: 'Произошла ошибка при получении данных' });
  }
});

app.get('/grids', async (req, res) => {
  try {
 
    const gridsOne = await getGridsData();
    const gridsTwo = await getGridsTwoData();
 

    const allProducts = 
                        [
                          ...gridsOne,
                          ...gridsTwo
                        ];

    // Отправляем объединенные данные в виде JSON в ответ на запрос
    res.json(allProducts);
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    // Отправляем ошибку в ответ на запрос
    res.status(500).json({ error: 'Произошла ошибка при получении данных' });
  }
});
 
app.get('/anti-theft', (req, res) => {
  AntiTheft.find({})
    .then((antiTheftData) => {
      res.json(antiTheftData);
    })
    .catch((error) => {
      console.log('Error retrieving anti-theft data: ', error);
      res.status(500).send('Internal Server Error');
    });
});

app.get('/baskets', (req, res) => {
  Baskets.find({})
    .then((basketsData) => {
      res.json(basketsData);
    })
    .catch((error) => {
      console.log('Error retrieving anti-theft data: ', error);
      res.status(500).send('Internal Server Error');
    });
});

app.get('/birdhouses', (req, res) => {
  Birdhouses.find({})
    .then((birdhousesData) => {
      res.json(birdhousesData);
    })
    .catch((error) => {
      console.log('Error retrieving anti-theft data: ', error);
      res.status(500).send('Internal Server Error');
    });
});

app.get('/flags', (req, res) => {
  Flags.find({})
    .then((flagsData) => {
      res.json(flagsData);
    })
    .catch((error) => {
      console.log('Error retrieving anti-theft data: ', error);
      res.status(500).send('Internal Server Error');
    });
});

app.get('/grids-one', (req, res) => {
  Grids.find({})
    .then((gridsData) => {
      res.json(gridsData);
    })
    .catch((error) => {
      console.log('Error retrieving anti-theft data: ', error);
      res.status(500).send('Internal Server Error');
    });
});

app.get('/grids-two', (req, res) => {
  GridsTwo.find({})
    .then((GridsTwoData) => {
      res.json(GridsTwoData);
    })
    .catch((error) => {
      console.log('Error retrieving GridsTwo data: ', error);
      res.status(500).send('Internal Server Error');
    });
});

app.get('/pergolias', (req, res) => {
  Pergolias.find({})
    .then((pergoliasData) => {
      res.json(pergoliasData);
    })
    .catch((error) => {
      console.log('Error retrieving anti-theft data: ', error);
      res.status(500).send('Internal Server Error');
    });
});

app.get('/swings', (req, res) => {
  Swing.find({})
    .then((swingData) => {
      res.json(swingData);
    })
    .catch((error) => {
      console.log('Error retrieving anti-theft data: ', error);
      res.status(500).send('Internal Server Error');
    });
});

app.get('/visors', (req, res) => {
  Visors.find({})
    .then((visorsData) => {
      res.json(visorsData);
    })
    .catch((error) => {
      console.log('Error retrieving anti-theft data: ', error);
      res.status(500).send('Internal Server Error');
    });
});

app.get('/woodcutters', (req, res) => {
  Woodcutters.find({})
    .then((woodcuttersData) => {
      res.json(woodcuttersData);
    })
    .catch((error) => {
      console.log('Error retrieving anti-theft data: ', error);
      res.status(500).send('Internal Server Error');
    });
});


 

app.get('/data', async (req, res) => {
  try {
    const mergedData = await dataService.getAllData();

    res.json(mergedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Определение схемы и модели
const mySchema = new mongoose.Schema({
  name: String,
  number: Number,
  product: [String]
});

const MyModel = mongoose.model('orders', mySchema);

// POST-запрос для добавления документа
app.post('/new-order', async (req, res) => {
  try {
    const { name, number, product } = req.body;
 
 
    // Создание нового документа
    const myDoc = new MyModel({
      name,
      number,
      product,
    });

    // Сохранение документа в базе данных
    const savedDoc = await myDoc.save();

    res.status(201).json(savedDoc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});





// Ваш код сервера, использующий порт
// app.listen(port, () => {
//   console.log(`Сервер запущен на порту ${port}`);
// });

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
  });
}

module.exports = app;

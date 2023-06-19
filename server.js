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
const port = process.env.PORT || 3004 ;
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
      const article = req.query.article; // Получаем значение параметра article из запроса
  
      const visors = await getVisorsData(article);
      const baskets = await getBasketsData(article);
      const antiTheft = await getAntiTheftData(article);
      const woodcutters = await getWoodcuttersData(article);
      const swing = await getSwingData(article);
      const pergolias = await getPergoliasData(article);
      const gridsOne = await getGridsData(article);
      const gridsTwo = await getGridsTwoData(article);
      const flags = await getFlagsData(article);
      const birdhouses = await getBirdhousesData(article);
  
      let allProducts = [];
  
      // Объединяем данные из каждой коллекции
      allProducts = allProducts.concat(visors, baskets, antiTheft, woodcutters, swing, pergolias, gridsOne, gridsTwo, flags, birdhouses);
  
      // Если есть значение параметра article, фильтруем все продукты по полю "article"
      if (article) {
        allProducts = allProducts.filter(product => product.article === article);
      }
  
      // Отправляем объединенные данные в виде JSON в ответ на запрос
      res.json(allProducts);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      // Отправляем ошибку в ответ на запрос
      res.status(500).json({ error: 'Произошла ошибка при получении данных' });
    }
  });
  

  app.get('/products-for-orders', async (req, res) => {
    try {
      const article = req.query.article; // Получаем значение параметра article из запроса
  
      let productsForOrders = await ProductsForOrders.find({});
  
      // Если есть значение параметра article, фильтруем продукты для заказов по полю "article"
      if (article) {
        productsForOrders = productsForOrders.filter(product => product.article === article);
      }
  
      // Отправляем данные продуктов для заказов в виде JSON в ответ на запрос
      res.json(productsForOrders);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      // Отправляем ошибку в ответ на запрос
      res.status(500).json({ error: 'Произошла ошибка при получении данных' });
    }
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
  const { article } = req.query;
  const filter = article ? { article } : {};

  AntiTheft.find(filter)
    .then((antiTheftData) => {
      res.json(antiTheftData);
    })
    .catch((error) => {
      console.log('Error retrieving anti-theft data: ', error);
      res.status(500).send('Internal Server Error');
    });
});

app.get('/baskets', (req, res) => {
  const { article } = req.query;
  const filter = article ? { article } : {};

  Baskets.find(filter)
    .then((basketsData) => {
      res.json(basketsData);
    })
    .catch((error) => {
      console.log('Error retrieving baskets data: ', error);
      res.status(500).send('Internal Server Error');
    });
});

app.get('/birdhouses', (req, res) => {
  const { article } = req.query;
  const filter = article ? { article } : {};

  Birdhouses.find(filter)
    .then((birdhousesData) => {
      res.json(birdhousesData);
    })
    .catch((error) => {
      console.log('Error retrieving birdhouses data: ', error);
      res.status(500).send('Internal Server Error');
    });
});

app.get('/flags', (req, res) => {
  const { article } = req.query;
  const filter = article ? { article } : {};

  Flags.find(filter)
    .then((flagsData) => {
      res.json(flagsData);
    })
    .catch((error) => {
      console.log('Error retrieving flags data: ', error);
      res.status(500).send('Internal Server Error');
    });
});

app.get('/grids-one', (req, res) => {
  const { article } = req.query;
  const filter = article ? { article } : {};

  Grids.find(filter)
    .then((gridsData) => {
      res.json(gridsData);
    })
    .catch((error) => {
      console.log('Error retrieving grids data: ', error);
      res.status(500).send('Internal Server Error');
    });
});

app.get('/grids-two', (req, res) => {
  const { article } = req.query;
  const filter = article ? { article } : {};

  GridsTwo.find(filter)
    .then((GridsTwoData) => {
      res.json(GridsTwoData);
    })
    .catch((error) => {
      console.log('Error retrieving GridsTwo data: ', error);
      res.status(500).send('Internal Server Error');
    });
});

app.get('/pergolias', (req, res) => {
  const { article } = req.query;
  const filter = article ? { article } : {};
  Pergolias.find(filter)
  .then((pergoliasData) => {
    res.json(pergoliasData);
  })
  .catch((error) => {
    console.log('Error retrieving pergolias data: ', error);
    res.status(500).send('Internal Server Error');
  });
});

app.get('/swings', (req, res) => {
const { article } = req.query;
const filter = article ? { article } : {};

Swing.find(filter)
  .then((swingData) => {
    res.json(swingData);
  })
  .catch((error) => {
    console.log('Error retrieving swings data: ', error);
    res.status(500).send('Internal Server Error');
  });
});

app.get('/visors', (req, res) => {
const { article } = req.query;
const filter = article ? { article } : {};

Visors.find(filter)
  .then((visorsData) => {
    res.json(visorsData);
  })
  .catch((error) => {
    console.log('Error retrieving visors data: ', error);
    res.status(500).send('Internal Server Error');
  });
});

app.get('/woodcutters', (req, res) => {
const { article } = req.query;
const filter = article ? { article } : {};

Woodcutters.find(filter)
  .then((woodcuttersData) => {
    res.json(woodcuttersData);
  })
  .catch((error) => {
    console.log('Error retrieving woodcutters data: ', error);
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
const orderSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  lfname: String,
  number: Number,
  chosenPost: String,
  addressPost: String,
  pricePost: Number, 
  product: [
    {
      article: String,
      name_of_product: String,
      price_rubles: Number,
      quantity: Number
    }
  ]
});

const OrderModel = mongoose.model('Order', orderSchema);

app.post('/new-order', async (req, res) => {
  try {
    const { fname, lname, lfname, number, chosenPost, addressPost, pricePost, product } = req.body;
 
    // Создание нового документа
    const order = new OrderModel({
      fname, lname, lfname, number, chosenPost, addressPost, pricePost, product
    });

    // Сохранение документа в базе данных
    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Определение схемы и модели
const feedbackSchema = new mongoose.Schema({
  name: String,
  number: Number
});

const FeedbackModel = mongoose.model('Feedback', feedbackSchema);


app.post('/new-feedback', async (req, res) => {
  try {
    const { name, number} = req.body;

    // Создание нового документа
    const order = new FeedbackModel({
      name, number
    });

    // Сохранение документа в базе данных
    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
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

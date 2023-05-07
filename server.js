// const express        = require('express');
// const MongoClient    = require('mongodb').MongoClient;
// const bodyParser     = require('body-parser');
// const app            = express();
// const db             = require('./config/db');
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
const Pergolias = require('./models/pergolias');
const Swing = require('./models/swing')
const Visors = require('./models/visors')
const Woodcutters = require('./models/woodcutters')
 
const app = express();
app.use(express.json());

// Подключение к базе данных
mongoose.connect('mongodb://localhost:27017/Arsenal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

app.get('/grids', (req, res) => {
  Grids.find({})
    .then((gridsData) => {
      res.json(gridsData);
    })
    .catch((error) => {
      console.log('Error retrieving anti-theft data: ', error);
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



// ...

app.get('/data', async (req, res) => {
  try {
    const mergedData = await dataService.getAllData();

    res.json(mergedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// // Определение схемы и модели
// const mySchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   email: String,
// });

// const MyModel = mongoose.model('MyModel', mySchema);

// // POST-запрос для добавления документа
// app.post('/documents', async (req, res) => {
//   try {
//     const { name, age, email } = req.body;
//     console.log( req.body)
 
//     // Создание нового документа
//     const myDoc = new MyModel({
//       name,
//       age,
//       email,
//     });

//     // Сохранение документа в базе данных
//     const savedDoc = await myDoc.save();

//     res.status(201).json(savedDoc);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Ошибка сервера' });
//   }
// });



// Запуск сервера
app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});

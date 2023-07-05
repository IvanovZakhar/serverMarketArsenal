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
const User = require('./models/users')
const bcrypt = require('bcrypt');
const saltRounds = 10; // Количество раундов соли (salt rounds) для хеширования пароля
const app = express();
const port = process.env.PORT || 3004 ;
const axios = require('axios');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const { spawn } = require('child_process');
// Разбор тела запроса в формате JSON
app.use(bodyParser.json());
app.use(express.json());
require('dotenv').config();
 
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

// Настройка маршрутов и другой функциональности вашего сервера

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/f9fd09879062.vps.myjino.ru/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/f9fd09879062.vps.myjino.ru/fullchain.pem')
};


 

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
  



  // Регистрация 
  const confirmationCode = generateConfirmationCode();
  const generatedPassword = generatePassword();
  const createdAt = new Date();
// Обработчик POST-запроса на регистрацию нового пользователя
app.post('/register', async (req, res) => {
  const { number, password } = req.body;
  const access = 'user';
  // Генерация кода подтверждения

  try {
    // Проверка, что пользователь с таким номером не существует
    const existingUser = await User.findOne({ number }).exec();

    if (existingUser) {
      return res.status(409).json({ error: 'Пользователь с таким номером уже существует' });
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание нового пользователя с сохранением в базу данных
    const newUser = new User({ access, number, password: hashedPassword, confirmationCode , createdAt});
    await newUser.save();

    // Отправка SMS с кодом подтверждения
    const message  = `Ваш код подтверждения: ${confirmationCode}`;
    await sendSMS(number, message); 
    res.json({ message: 'Код подтверждения отправлен на ваш номер телефона' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Обработчик POST-запроса на подтверждение номера
app.post('/verify', async (req, res) => {
  const { number, code } = req.body;

  try {
    // Поиск пользователя с указанным номером и кодом подтверждения
    const user = await User.findOne({ number, confirmationCode: code }).exec();

    if (!user) {
      return res.status(401).json({ error: 'Неправильный код подтверждения' });
    }

  
    user.confirmationCode = '';
    user.isNumberVerified = true; // Установка значения isNumberVerified на true
    await user.save();

    res.json({ message: 'Регистрация прошла успешно' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.post('/send-auth', async (req, res) => {
  const { number  } = req.body; 
  const message = `Ваш заказ оформлен. Для авторизации на сайте АрсеналЪ-1.РФ используйте Номер: ${number} Пароль: ${generatedPassword}`
  await sendSMS(number, message).then(res.json({ message: 'Регистрация прошла успешно' }))
  
});
  
  // Функция для генерации случайного кода подтверждения
  function generateConfirmationCode() {
    // Генерация случайного 4-значного числа
    return Math.floor(1000 + Math.random() * 9000).toString();
  }
  
  // Обработчик POST-запроса на авторизацию пользователя
  app.post('/login', async (req, res) => {
    const { number, password } = req.body; 
    try {
      // Поиск пользователя в базе данных
      const user = await User.findOne({ number: number }).exec(); 
      if (!user) {
        return res.status(401).json({ error: 'Неправильное имя пользователя или пароль' });
      }
  
      // Сравнение хешированного пароля с введенным паролем
      const passwordMatch = await bcrypt.compare(password, user.password); 
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Неправильное имя пользователя или пароль' });
      } 
      res.json({ message: 'Авторизация прошла успешно', userId: user._id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  });
  
// Обработчик POST-запроса на поиск пользователя по ID
app.post('/users', async (req, res) => {
  try {
    const { userId } = req.body;

    // Поиск пользователя по userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    // Отправка данных пользователя в ответе
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
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



 

const apiUrl = process.env.API_URL;
 // Ваш логин в системе SMS Aero
const apiKey = process.env.SMS_APIKEY; // Ваш API-ключ
const username = process.env.SMS_LOGIN;
const sendSMS = async (phoneNumber, message) => {
  try {  
    const senderName = 'SMS Aero'; // Имя отправителя 
    const url = `${apiUrl}/sms/send`;
    const authHeader = `Basic ${Buffer.from(`${username}:${apiKey}`).toString('base64')}`;
    const requestData = {
      numbers: [phoneNumber],
      text: message,
      sign: senderName
    };

    const response = await axios.post(url, requestData, { headers: { 'Authorization': authHeader } });
 
  } catch (error) {
    console.error(error);
  }
};


 // Определение схемы и модели
 const orderSchema = new mongoose.Schema({
  userId: String,
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
  ],
  status: {
    type: String,
    default: 'В обработке'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const OrderModel = mongoose.model('Order', orderSchema);

app.post('/new-order', async (req, res) => {
  
    const { fname, lname, lfname, number, chosenPost, addressPost, pricePost, product } = req.body;

    const access = 'user' 
    // Проверка, что пользователь с таким номером не существует
    const existingUser = await User.findOne({ number }).exec();

    if (existingUser) {
      return res.status(409).json({ error: 'Пользователь с таким номером уже существует' });
    }  
  
    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    // Создание нового пользователя с сохранением в базу данных
    const newUser = new User({ access, fname, lname, lfname, number, password: hashedPassword, confirmationCode });

    await newUser.save();
    const userId = newUser._id 
    // Отправка SMS с кодом подтверждения
    const message  = `Ваш код подтверждения: ${confirmationCode}`;
    await sendSMS(number, message);

    res.json({ message: 'Код подтверждения отправлен на ваш номер телефона' }); 
    // Создание нового документа
  
    const order = new OrderModel({
      userId,
      fname,
      lname,
      lfname,
      number,
      chosenPost,
      addressPost,
      pricePost,
      product,
      status: 'В обработке',
      createdAt
    });

    // Сохранение документа в базе данных
    await order.save();
    
  
 
});
app.post('/new-orderauth', async (req, res) => {
  
  const {userId, fname, lname, lfname, number, chosenPost, addressPost, pricePost, product } = req.body;
 
   
  // Создание нового документа

  const order = new OrderModel({
    userId,
    fname,
    lname,
    lfname,
    number,
    chosenPost,
    addressPost,
    pricePost,
    product,
    status: 'В обработке',
    createdAt
  });

  // Сохранение документа в базе данных
  await order.save();
  
  res.json({ message: 'Ваш заказ создан' });
 

});


// POST-маршрут для обновления пароля пользователя по номеру телефона
app.post('/update-password', async (req, res) => {
  const { number } = req.body;

  try {
    // Поиск пользователя по номеру телефона
    const user = await User.findOne({ number });

    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
     
   
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);
    // Обновление пароля
    user.password = hashedPassword;
    await user.save();
    // Отправка смс с новым паролем
   
    const message = `Номер:${number} Новый пароль: ${generatePassword}`
    await sendSMS(number, message)
    return res.status(200).json({ message: 'Новый пароль отправлен вам в SMS сообщении' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

app.post('/orders-by-user', async (req, res) => {
  const { userId } = req.body;

  try {
    const orders = await OrderModel.find({ userId });

    res.json({ orders });
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
 
app.post('/users/:id', async (req, res) => {
  const { id } = req.params; // Получаем id из URL-параметра
  const { lname, fname, lfname, email } = req.body; // Получаем lname, fname, lfname из тела запроса

  try {
    // Находим пользователя по id
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    // Обновляем lname, fname, lfname пользователя
    user.lname = lname;
    user.fname = fname;
    user.lfname = lfname;
    user.email = email;
    // Сохраняем обновленного пользователя
    await user.save();

    res.json({ message: 'Данные пользователя успешно обновлены' });
  } catch (error) {
    console.error('Ошибка при обновлении данных пользователя:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.post('/reset-password', async (req, res) => {
  const { number, password } = req.body;

  try {
    // Поиск пользователя в базе данных по номеру телефона
    const user = await User.findOne({ number: number }).exec();
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    // Обновление пароля пользователя
    user.password = password;

    // Сохранение обновленного пользователя
    await user.save();

    res.json({ message: 'Пароль успешно изменен' });
  } catch (error) {
    console.error('Ошибка при изменении пароля:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});




 
if (require.main === module) {
  https.createServer(options, app).listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
  });
}
// if (require.main === module) {
//   app.listen(port, () => {
//     console.log(`Сервер запущен на порту ${port}`);
//   });
// }


function generatePassword() {
  const length = 6;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
}


module.exports = app;

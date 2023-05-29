require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const { handleErrors } = require('./middlewares/handleErrors');

const { PORT, DB_ADDRESS } = require('./config');

// создаем инстанс сервера
const app = express();
// добавить cors как мидлвар
app.use(cors());

app.use(express.json());
app.use(helmet());
app.use(cookieParser());
mongoose.connect(DB_ADDRESS);
// Краш-тест сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
// подключаем маршруты
app.use('/', router);

app.use(errors()); // обработчик ошибок celebrate
app.use(handleErrors); // централизованный обработчик
// запускаем сервер на порте 300
app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const { handleErrors } = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, DB_ADDRESS, LIMITER_OPTIONS } = require('./config');

const limiter = rateLimit(LIMITER_OPTIONS);

// создаем инстанс сервера
const app = express();
// добавить cors как мидлвар
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://ideafix.nomoredomains.rocks',
    'http://ideafix.nomoredomains.rocks',
  ],
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
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
app.use(requestLogger);// подключаем логгер запросов до всех обработчиков роутов
// лимитер запросов для ограничения количества запросов к API
// Его стоит подключать после логера запросов, иначе заблокированные запросы не будут записаны
app.use(limiter);
app.use('/', router);// подключаем маршруты
app.use(errorLogger);// подключаем логгер ошибок после обработчиков роутов и до обработчиков ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(handleErrors); // централизованный обработчик
// запускаем сервер на порте 300
app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

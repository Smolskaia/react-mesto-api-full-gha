const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const { handleErrors } = require('./middlewares/handleErrors');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
// создаем инстанс сервера
const app = express();
// добавить cors как мидлвар
app.use(cors());

app.use(express.json());
app.use(helmet());
app.use(cookieParser()); // подключаем парсер кук как мидлвэр
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// подключаем маршруты
app.use('/', router);

app.use(errors()); // обработчик ошибок celebrate
app.use(handleErrors); // централизованный обработчик
// запускаем сервер на порте 300
app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

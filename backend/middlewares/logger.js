const winston = require('winston');
const expressWinston = require('express-winston');

// логгер запросов
const requestLogger = expressWinston.logger({
  transports: [ // transports отвечает за то, куда нужно писать лог
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(), // format отвечает за формат записи логов
});
// логгер ошибок
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};

/*
Всё, что делает этот конструктор, —
наследует от стандартной ошибки и выставляет свойство statusCode.
После создания конструктора NotFoundError, его можно импортировать
в другие места кода и использовать
вместе с инструкцией throw
*/

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;

const bcrypt = require('bcryptjs'); // импортируем bcrypt для хеширования пароля
const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken
const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const ConflictError = require('../errors/conflictError');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next); // запись эквивалентна .catch(err => next(err));
};

const getUserById = (req, res, next) => {
  // Метод findById ищет запись по идентификатору, то есть свойству _id
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('User with such id is not found'));
      }
      return next(err);
    });
};

const getUser = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('User with such id is not found'));
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Incorrect user data'));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      // метод модели create принимает
      // на вход объект с данными, которые нужно записать в базу
      User.create({
        name, about, avatar, email, password: hash,
      })
      /* Метод create может быть промисом —
      ему можно добавить обработчики then и catch, чтобы
      вернуть клиенту данные или ошибку */

      // вернём записанные в базу данные
        .then((user) => res.status(201).send({
          data: {
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
          },
        }))// если данные не записались
        .catch((err) => {
          if (err.code === 11000) {
            return next(new ConflictError('This user already exists'));
          }
          if (err.name === 'ValidationError') {
            return next(new BadRequestError('Incorrect user data'));
          }
          return next(err);
        });
    });
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('User with such id is not found'));
      }
      return next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  // третьим аргументом метод обновления документов принимает объект опций
  // new: true - передать обновлённый объект на вход обработчику then
  // runValidators: true - валидировать новые данные перед записью в базу
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError('Incorrect avatar data'));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
    // аутентификация успешна! пользователь в переменной user
    // создадим токен сроком на неделю.
    // В пейлоуд токена записываем только свойство _id,
    // которое содержит идентификатор пользователя
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token }); // отправка токена в теле ответа
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
  login,
};

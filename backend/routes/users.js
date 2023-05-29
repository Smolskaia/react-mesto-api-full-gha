const userRouter = require('express').Router();
// подключаем валидацию
const {
  validationUserId,
  validationUpdateProfile,
  validationUpdateAvatar,
} = require('../utils/validation');

// подключаем контроллеры
const {
  getUsers,
  getUserById,
  getUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers); // возвращает всех пользователей
userRouter.get('/me', getUser); // возвращает информацию о текущем пользователе
userRouter.get('/:userId', validationUserId, getUserById); // возвращает пользователя по _id
userRouter.patch('/me', validationUpdateProfile, updateProfile); // обновляет профиль
userRouter.patch('/me/avatar', validationUpdateAvatar, updateAvatar); // обновляет аватар

module.exports = userRouter;
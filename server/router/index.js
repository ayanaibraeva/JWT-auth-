const Router = require("express").Router;
const UserController = require("../controllers/user-controller.js")

const router = new Router();

router.post('/registration', UserController.registration);
router.post('/login', UserController.registration);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);
router.get('/users', UserController.getUsers); // тестовый endpoint, данные которого будет получать авторизованный пользователь


module.exports = router;


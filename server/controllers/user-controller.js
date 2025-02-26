//Controller - работа с клиент-серверной составляющей (body, params, headers ...)

const userServices = require('../service/user-service')
const {validationResult} = require('express-validator')
const ApiError = require('../exseptions/api-error')

class UserController {
    async registration(req, res, next) {
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {email, password} = req.body
            const userData = await userServices.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userServices.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next){
        try {
            const {refreshToken} = req.cookies;
            const token = await userServices.logout(refreshToken);
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }
        async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userServices.activate(activationLink); //адресс сервера
            return res.redirect(process.env.CLIENT_URL) //адрес фронтенда
        } catch (e) {
            next(e)
        }
    }
        async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userServices.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }
    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new UserController();
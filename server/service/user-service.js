const UserModel = require("../models/user-module");
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto')
class UserService {
    async registration (email, password) {
        const candidate = await UserModel.findOne({}); //проверяем, нет ли пользователей с таким же именем
        if (candidate) {
            throw new Error(`Пользователь с почтовым адресом ${email} уже существует!`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activateLink = uuid.v4();

        const user = await UserModel.create({email, password: hashPassword});
        await mailService.sendActivationMail(email, activateLink);

        const userDto = new UserDto(user); //email, id, isActivated
        const tokens = tokenService.generationTokens({...userDto});
        await tokenService.SaveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }
}

module.exports = new UserService();
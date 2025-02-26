module.exports = class UserDto {
    email;
    id;
    isActivated;

    constructor(model) {
        this.email = model.email;
        this.id = model._id; // _id обозначаем, что это поле не изменяемое
        this.isActivated = model.isActivated;
    }
}
'use strict';

module.exports = function(app) {
    var userList = require('./controller');
    app
    .route("/rest/v1/users")
    .post(userList.createUser)

    app
    .route("/rest/v1/users/:id/cart")
    .get(userList.listUserCart)
    .put(userList.updateUserCart);
};

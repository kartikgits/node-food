const { verifySignUp } = require('../../middlewares/restaurant');
const controller = require('../../controllers/restaurant/auth.controller');

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.post('/auth/signup', [verifySignUp.checkDuplicateRestaurantEmail], controller.signup);
    app.post('/auth/signin', controller.signin);
};
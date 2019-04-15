const UserController = require('./controllers/UserController')

module.exports = (app) => {
  app.get('/user',
    UserController.show)
  app.post('/user/add',
    UserController.put)
}

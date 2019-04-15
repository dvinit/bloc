const bluebird = require('bluebird')
module.exports = {
  port: process.env.PORT || 3306,
  db: {
    database: process.env.DB_NAME || 'db_intern',
    user: process.env.DB_USER || 'dummyUser',
    password: process.env.DB_PASS || 'dummyUser01',
    host: process.env.HOST || 'localhost', // db-intern.ciupl0p5utwk.us-east-1.rds.amazonaws.com
    Promise: bluebird,
    multipleStatements: true
  }
}

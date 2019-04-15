const mysql = require('mysql2')
const config = require('../config/config')

class Database {
  constructor (config) {
    this.connection = mysql.createConnection(config)
  }
  query (sql, args) {
    console.log(`${sql}\n\n`)
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) { return reject(err) }
        resolve(rows)
      })
    })
  }
  close () {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) { return reject(err) }
        resolve()
      })
    })
  }
}
let db = new Database(config.db)

module.exports = db

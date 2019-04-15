const db = require('../db')
const _ = require('lodash')

module.exports = {
  async show (req, res) {
    try {
      let user = {}
      let query = JSON.parse(req.query.query)
      console.log(req.query)
      const q1 = `SELECT * FROM userData WHERE emailId = "${query.emailId}"`
      // console.log(q1, '\n\n')
      let l1data = await db.query(q1)
      console.log(l1data)
      if (l1data.length === 0) {
        res.status(404).send({
          error: 'No Records Found'
        })
      } else {
        _.extend(user, l1data[0])
        res.send(user)
      }
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error has occured while Querying Values'
      })
    }
  },
  async put (req, res) {
    const body = req.body
    try {
      const q1 = `SELECT * FROM userData WHERE emailId = "${body.emailId}"`
      let user = await db.query(q1)
      if (user.length === 0) {
        const q2 = `INSERT INTO userData(userName, emailId, phoneNo, password, dateTime) \
          VALUES ("${body.userName}", "${body.emailId}", "${body.phoneNo}", "${body.password}", CURRENT_TIMESTAMP)`
        await db.query(q2)
        user = await db.query(q1)
      } else {
        const q3 = `UPDATE userData\
          SET userName="${body.userName}", phoneNo="${body.phoneNo}", password="${body.password}", dateTime=CURRENT_TIMESTAMP
          WHERE emailId="${body.emailId}"`
        await db.query(q3)
        user = await db.query(q1)
      }
      res.send(user)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error has occured while Insering or Updating values'
      })
    }
  }
}

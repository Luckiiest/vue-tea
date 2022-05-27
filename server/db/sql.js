// 数据库的配置
const mysql = require('mysql')

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '020918',
  database: 'vue_store',
})

module.exports = connection

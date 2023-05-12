import mysql from 'mysql'

const db = mysql.createConnection(
  {
    host:"database-1.cp5jbvccclld.us-east-1.rds.amazonaws.com",
    port:"3306",
    user:"admin",
    password:"12345678",
    database:"jogo_memoria"  
  }
)

export default db;
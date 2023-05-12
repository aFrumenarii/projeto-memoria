import db from '../db.js'
import bcrypt from 'bcrypt'

export const registrarUsuário = (req, res) => {
  //checar se usuário existe
  const selectQuery = `select * from usuarios where username = ? or email = ?`
  db.query(selectQuery,[req.body.email, req.body.username],(err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("Usuário já existe")
  })
  //encriptar a senha

  const saltRounds = 10;
  const hash = bcrypt.hashSync(req.body.passwd, saltRounds);

    
  //fazer o insert no db
  const insertQuery = `insert into usuarios (username, email, passwd) values (?)`
  const values = [
    req.body.username,
    req.body.email,
    hash
  ]

  db.query(insertQuery, [values], (err, data) => {
    if(err) return res.json(err);
    return res.status(209).json(`Usuário foi criado com sucesso`)
  })
}

export const autenticarUsuário = (req, res) => {
  //check if user exists
  const selectQuery = `SELECT * FROM usuarios WHERE username = ?`
  db.query(selectQuery, [req.body.username], (err, data) => {
    if (err) return res.json(err);

    if (data.length === 0) {
      // If user doesn't exist, return an error message
      return res.status(404).json({ message: "Usuário não encontrado." });
    } else {
      // If user exists, compare the passwords
      const user = data[0]; // Assume there's only one user with this username

      if (user.passwd === req.body.passwd) {
        // Passwords match, return success
        return res.status(200).json({ message: "Autenticação bem-sucedida." });
      } else {
        // Passwords don't match, return an error message
        return res.status(401).json({ message: "Senha incorreta." });
      }
    }
  })
}

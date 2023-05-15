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
  // Checando se o usuário existe
  const selectQuery = `SELECT * FROM usuarios WHERE email = ?`
  db.query(selectQuery, [req.body.email], (err, data) => {
    
    if (err) return res.json(err);
    if (data.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
    // Se usuário existir, compara as senhas
    else { 
      const user = data[0];

      // Usa o bcrypt para fazer a comparação da senha enviada pelo front-end com a senha do banco de dados que se encontra criptografada
      bcrypt.compare(req.body.passwd, user.passwd, (err, result) => {
        if(err) return err; 
        if (result) {
          return res.json({message: "usuário foi autenticado com sucesso"})
        }
        if(!result) {
          return res.json({message: "usuário ou senha incorreto"})
        }
      })

    }
  })
}

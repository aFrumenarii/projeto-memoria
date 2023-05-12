import express from 'express'
import auth from './routes/auth.js'
import cors from 'cors'

const app = express()
app.use(express.json())

app.use(cors())

app.use(cors({
  origin:"http://localhost:5173"
}))


app.use('/api/auth/', auth)



app.listen(5000, ()=>{
  console.log("O servidor está escutando na porta 5000")
})



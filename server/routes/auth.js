import express from 'express'
import { autenticarUsuário, registrarUsuário } from '../controllers/auth.js'

const router = express.Router()

router.post('/registro', registrarUsuário)
router.post('/login', autenticarUsuário)

export default router;
import express from 'express'
import { googleAuth, lagOut } from '../controllers/auth.controller.js'

const authRouter = express.Router()


authRouter.post("/google" ,googleAuth )
authRouter.get("/logout", lagOut)

export default authRouter
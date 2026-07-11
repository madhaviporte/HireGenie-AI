import express from 'express'
import { upload } from '../middlewares/multer.js'
import isAuth from '../middlewares/isAuth.js'
import { analyzeResume, finishInterview, generateQuestion } from '../controllers/interview.Controller.js'




const interviewRouter = express.Router()

interviewRouter.post("/resume", isAuth ,upload.single("resume"),analyzeResume)

interviewRouter.post("/generate-questions" , isAuth, generateQuestion)

interviewRouter.post("/submit-answer", isAuth,generateQuestion)

interviewRouter.post("/finish", isAuth,finishInterview)


export default interviewRouter
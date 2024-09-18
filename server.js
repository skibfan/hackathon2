import express from 'express'
import router from './routes/routes.js'
const app = express()
const PORT = 3013
app.listen(PORT, console.log(`listening: ${PORT}`))
app.use(express.json())
app.use(router)

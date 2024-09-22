import express from 'express'
import router from './routes/routes.js'
import path from 'path'
import session from 'express-session'

const app = express()
const PORT = 3040

app.use(session({
    secret: 'wow-much-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))


app.listen(PORT, console.log(`listening: ${PORT}`))
app.set("view engine", "ejs");
app.use(express.json())

app.use(router)

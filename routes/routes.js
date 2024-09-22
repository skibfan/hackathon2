import express from 'express'
import path from 'path'
import { getApiData, loginUser, registerNewU, getFavorites, makeFavorite,deleteFav } from '../controllers/controller.js'
import { log } from 'console';

const router = express.Router()

router.use(express.static(path.resolve('./public2')));

router.get('/', (req, res) => {
    res.render('../public2/register');
})
router.get('/register', (req, res) => {
    res.render('../public2/register');
})

router.post('/register', registerNewU)

router.get('/login', (req, res) => {
    res.render('../public2/login');
})

router.post('/login', loginUser)

router.get('/weather', (req, res) => {
    if (req.session.username) {
        res.render('../public2/weather');
    } else {
        res.redirect('/login');
    }
})

router.post('/weather', getApiData)


router.get('/favorites', getFavorites)

router.post('/weather/:location', makeFavorite)

router.delete('/favorites', deleteFav)

export default router
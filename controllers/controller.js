import {  _deleteFav, _getApiData, _getFavorites, _loginUser, _makeFavorite, _registerNewU } from '../models/model.js'


export const registerNewU = async (req, res) => {
    const {email, username, first_name, last_name, password} = req.body
    try {
        await _registerNewU(email, username, first_name, last_name, password)
        res.status(200).json({ message: 'user created succesfully!'})
    } catch(e) {
        res.status(500).json({ message: 'hmmm some error'})
    }
}


export const loginUser = async (req, res) => {
    const {username, password} = req.body
    try {
        const data = await _loginUser(username, password)
        req.session.username = username
        req.session.favorites = data.favorites
        req.session.save((err) => {
            if (err) {
            res.status(500).json({message: 'not saving this session'})
        } else {
            res.json({isLogged: data.isLogged, redirectUrl: '/weather'})
        }
    })
        
        
    } catch (e) {
        res.status(500).json({ message: 'hmmm some error with login'})
    }
}

export const getApiData = async (req, res) =>  {
    const {location} = req.body
    try {
        const data = await _getApiData(location)
        res.json(data)
    } catch (error) {
        res.sendStatus(500)
    }
   
} 

export const getFavorites = async (req, res) => {
    const username = req.session.username
    try{
        const data = await _getFavorites(username)
        if (data.favorites !== null){
            res.render('../public2/favorites.ejs', {favorites: data.favorites})
        } else {
            res.render('../public2/favorites.ejs', {favorites: 'nothing'})
        }
        
    } catch (e) {
        res.status(500).json({message: 'hmmm some error with favorites'})
    }
}


export const makeFavorite = (req, res) => {
    const username = req.session.username
    const {location} = req.params
    try {
        _makeFavorite(username, location)
    } catch (e) {
        res.status(500).json({message: 'hmmm some error with making favorites'})
    }
}


export const deleteFav = (req, res) => {
    const username = req.session.username
    const {location} = req.body
    try {
        if (_deleteFav(username, location)) {
            res.json({isDeleted: true})
        } else {
            res.json({isDeleted: false})
        }
    } catch (e) {
        res.status(500).json({message: 'hmmm some error with deleting favorites'})
    }
}
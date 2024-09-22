import {db} from '../config/data.js'
import bcrypt from 'bcrypt'
import axios from 'axios'
const hashPassword = async (password) => {
    const saltRounds = 10
    const hashedPass = await bcrypt.hash(password, saltRounds)
    return hashedPass
}

const checkPass = async (password, hashedPass) => {
    const flag = await bcrypt.compare(password, hashedPass)
    return flag
}

export const _registerNewU = async (email, username, first_name, last_name, password) => {
    try {
        password = await hashPassword(password)
        const trx = await db.transaction()

        const newUser = await db('weatherapp').insert({email, username, first_name, last_name, password}, ["id",'email', 'username', 'first_name', 'last_name', 'password']).transacting(trx)
        
        await trx.commit()
        console.log(`user ${username} created successfuly`);
        return newUser
    } catch (e) {
        console.log('user not created');
        console.log(e);
        await trx.rollback()
        throw(e)
    }
}

export const _loginUser = async (username, passwordinput) => {
    try {
        const result = await db('weatherapp').select("password").where({username}).first()
        const passwordhash = result.password
        
        if (await checkPass(passwordinput, passwordhash)) {
            return {isLogged: true, favorites: result.favorites}
        } else {
            return {isLogged: false, favorites: ''}
        }
    } catch (e) {
        console.log('some error, user not created?');
        throw(e)
    }
}

export const _updateUserByID =  (id, first_name, last_name,email) => {
    try {
        return db('weatherapp').update({email, first_name, last_name}, ["id", "email", "username", "first_name", "last_name"]).where({id})
    } catch (e) {
        throw(e)
    }
}


export const _getApiData = async (location) => {
    const apiKey = '8d732749ef514ec9ab982933241809';

    try {
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
        return response.data;

    } catch (error) {
        console.error('Error fetching the weather data:', error);
        throw(error)
    }
};


export const _getFavorites = async(username) => {
    try {
        return  await db('weatherapp').select('favorites').where({ username }).first();
    } catch (e) {
        throw(e)
    }
}


export const _makeFavorite = async(username, location) => {
    try {
        
        let favorites = await db('weatherapp').select('favorites').where({ username }).first();

        let newFav
        if (favorites.favorites !== null){
            newFav = favorites.favorites.split(',')
        } else {
            newFav = [location]
        }
        if (newFav.findIndex(elem => elem === location) === -1) {
            newFav.push(location)
        }

        favorites = newFav.join(',')
        console.log(favorites);
        
        await db('weatherapp').update({favorites}).where({username})
        
    } catch (e) {
        throw(e)
    }
}



export const _deleteFav = async (username, location) => {
    try {
         console.log(location);
         
        let favorites = await db('weatherapp').select('favorites').where({ username }).first();

        let newFav
        if (favorites.favorites !== null){
            newFav = favorites.favorites.split(',')
       
            newFav.map(elem => {
                elem = elem.replace( /[_]/g, "'")
            })
            console.log(favorites);
            

        let index = newFav.findIndex(elem => elem === location)
        console.log('index: ', newFav[index]);
        
        if (index !== -1) {

            newFav.splice(index, 1)
            console.log('after splice', newFav);
            
        }
        favorites = newFav.length > 0 ? newFav.join(',') : null
        
        await db('weatherapp').update({favorites}).where({username})
        return true
    } else {
        throw new Error('no favorites')
    }
    } catch (e) {
        throw(e)
    }
}
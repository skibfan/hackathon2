
const getLocation = async (e) => {
    e.preventDefault()
    const location = e.target.location.value
    
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include', 
        body: JSON.stringify({ location })
    }
    
    try {
        const result = await fetch('/weather', options)
        const data = await result.json()
        
        const html = `
    <p>Current Temperature: <strong>${data.current.temp_c}&deg;C</strong></p>
    <p>Location: <strong id="serverlocation">${data.location.name}</strong></p>
    <button onclick="makeFavorite(event)">Make Favorite</button><img id='weathericon' src=${data.current.condition.icon}>
`;
document.getElementById('serverresponse').innerHTML = html;
    } catch (e) {
        console.log(e); 
        document.getElementById('serverresponse').innerHTML = '<p>An error occurred. Please try again.</p>';
    }
}





const registerNewUser = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const username = e.target.username.value
    const first_name = e.target.first_name.value
    const last_name = e.target.last_name.value
    const password = e.target.password.value
    
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include', 
        body: JSON.stringify({ email, username, first_name, last_name, password })
    }
    
    try {
        const result = await fetch('/register', options)
        const data = await result.json()
        
        let html = ``
        if (data.message === 'user created succesfully!') {
            html = `<p>Hello ${username}, your account is now created!</p>`
        } else { 
            html = `<p>Username already exists</p>`
        }
        document.getElementById('serverresponse').innerHTML = html
    } catch (e) {
        console.log(e); 
        document.getElementById('serverresponse').innerHTML = '<p>An error occurred. Please try again.</p>';
    }
    
}




const login = async (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value
    
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include', 
        body: JSON.stringify({ username, password })
    }
    
    try {
        const result = await fetch('/login', options)
        const data = await result.json()
        
        console.log(data);
        
        if (data.isLogged) {
            window.location.href = data.redirectUrl
        } else { 
            document.getElementById('serverresponse').innerHTML = `<p>Username not exist</p>`
        }

    } catch (e) {
        console.log(e); 
        document.getElementById('serverresponse').innerHTML = '<p>An error occurred. Please try again.</p>';
    }
    
}


const makeFavorite = async (e) => {
    e.preventDefault()

    // console.log(e.target.dataset);
    const location = document.getElementById('serverlocation').textContent
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include', 
        body: JSON.stringify({ location })
    }

    try {
        const result = await fetch(`/weather/${location}`, options)
        const data = await result.json()

        document.getElementById('favoritesresponse').innerHTML = `${location} successfuly added to your favorite locations!`;
    } catch (e) {
        console.log(e); 
        document.getElementById('favoritesresponse').innerHTML = '<p>An error occurred. Please try again.</p>';
    }

}

const getFavorites = (favorites) => {
    console.log(favorites);
    
    const favoritesDiv = document.getElementById('favorites');
    let fav = favorites.split(',')
    if (favorites === 'nothing') {
        favoritesDiv.innerHTML = "<p>You don't have any favorite places yet.</p>";
    } else {
        fav.forEach(elem => {
            createFavorite(elem)
        });
    }
};






const createFavorite = async (location) => {
    
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include', 
        body: JSON.stringify({ location })
    }
    
    try {
        const result = await fetch('/weather', options)
        const data = await result.json()
        const locationDiv = document.createElement('div')
        location = location.replace(/[']/, '_')
        const html = `<div id='${location}'>
            <p>Current Temperature: <strong>${data.current.temp_c}&deg;C</strong></p>
            <p>Location: <strong id="serverlocation">${data.location.name}</strong></p>
            <button id='${location}' onclick="deleteFav('${location}')">Delete</button>
            <img id='weathericon' src=${data.current.condition.icon}>
        </div>`;
        locationDiv.innerHTML = html
        document.getElementById('favorites').appendChild(locationDiv)

    } catch (e) {
        console.log(e); 
        document.getElementById('favorites').innerHTML = '<p>An error occurred. Please try again.</p>';
    }
}


const deleteFav = async (location) => {
    console.log(location);
    
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include', 
        body: JSON.stringify({ location })
    }

    try {
        const result = await fetch(`/favorites`, options)
        const data = await result.json()
        if (data.isDeleted) {
            
            document.getElementById(location).remove()
        }

    } catch (e) {
        console.log(e); 
    }


}

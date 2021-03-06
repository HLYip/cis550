import config from './config.json'

const getSearchResults = async (city, category, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search?city=${city}&category=${category}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    var json = await res.json()
    return {status: res.status, result: json}
}

const postSignup = async (normal, user_id, username, password, prefer_health) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/signup`, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            normal,
            user_id,
            username,
            password,
            prefer_health,
        }),
        mode: 'cors',
    })
    var json = await res.json()
    return {status: res.status, result: json}
}

const postLogin = async (username, password) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/login`, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({
            username,
            password,
        })
    })
    var json = await res.json()
    return {status: res.status, result: json}
}

const postLogin2 = async (user_id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/loginWithAccount`, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({
            user_id
        })
    })
    var json = await res.json()
    return {status: res.status, result: json}
}


const postLogout= async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/logout`, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
    })
    var json = await res.json()
    return {status: res.status, result: json}
}

const getTodayRecommendation = async (category, limit=8) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/todayrecommendation?category=${category}&limit=${limit}`, {
        method: 'GET',
    })
    var json = await res.json()
    return {status: res.status, result: json}
}

const getRestInfo = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/restaurant?bus_id=${id}`, {
        method: 'GET',
    })
    var json = await res.json()
    return {status: res.status, result: json}
}

const getStateInfo = async (state) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/stateinfo?state=${state}`, {
        method: 'GET',
    })
    var json = await res.json()
    return {status: res.status, result: json}
} 

const postAddLike = async (business_id, user_id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/like`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            business_id,
            user_id,
        }),
        mode: 'cors',
        credentials: "include"
    })
    var json = await res.json()
    return {status: res.status, result: json}
}

const deleteRemoveLike = async (business_id, user_id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/like`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            business_id,
            user_id,
        }),
        mode: 'cors',
        credentials: "include"
    })
    var json = await res.json()
    return {status: res.status, result: json}
}

const getIsLike = async (user_id, business_id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/like?user_id=${user_id}&business_id=${business_id}`, {
        method: 'GET',
    })
    var json = await res.json()
    return {status: res.status, result: json}
} 

const getCollections = async (user_id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/likes?user_id=${user_id}`, {
        method: 'GET',
    })
    var json = await res.json()
    return {status: res.status, result: json}
} 

const getCovidData = async (state) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/covid?state=${state}`, {
        method: 'GET',
    })
    var json = await res.json()
    return {status: res.status, result: json}
}

const getCountyCovid = async (county) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/countyhealth?county=${county}`, {
        method: 'GET',
    })
    var json = await res.json()
    return {status: res.status, result: json}
}

export {
    getSearchResults,
    postSignup,
    postLogin,
    postLogout,
    getTodayRecommendation,
    getRestInfo,
    getStateInfo,
    postAddLike,
    deleteRemoveLike,
    getIsLike,
    getCollections,
    getCovidData,
    postLogin2,
    getCountyCovid
}
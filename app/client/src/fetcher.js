import config from './config.json'

const getSearchResults = async (city, category, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search?city=${city}&category=${category}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    var json = await res.json()
    return {status: res.status, result: json}
}

const postSignup = async (username, password, prefer_health) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/signup`, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
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
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            username,
            password,
        }),
        mode: 'cors',
        credentials: "include"
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

const getTodayRecommendation = async (category) => {
    console.log(category)
    var res = await fetch(`http://${config.server_host}:${config.server_port}/todayrecommendation?category=${category}`, {
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

export {
    getSearchResults,
    postSignup,
    postLogin,
    postLogout,
    getTodayRecommendation,
    getRestInfo
}
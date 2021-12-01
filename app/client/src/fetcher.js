import config from './config.json'

const getSearchResults = async (city, category, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search?city=${city}&category=${category}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    var json = await res.json()
    return {status: res.status, result: json}
}


export {
    getSearchResults,
}
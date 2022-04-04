import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const promise = axios.get(baseUrl)
    const data = promise.then( response => response.data)
    return data
}

const create = (newPerson) => {
    return axios
        .post(baseUrl, newPerson)
        .then(response => response.data)
}

const remove = (person) => {
    return axios
        .delete(`${baseUrl}/${person.id}`)
}

const update = (updatedPerson) => {
    return axios
        .put(`${baseUrl}/${updatedPerson.id}`, updatedPerson)
        .then(response => response.data)
}

export default { getAll, create, remove, update }
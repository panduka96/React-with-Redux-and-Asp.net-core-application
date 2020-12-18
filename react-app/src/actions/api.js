import axios from 'axios'

const baseURL = "http://localhost:13708/api/"

export default {

    dCandidate(url = baseURL + 'DCandidate/'){ 

        return {
            fetchAll : () => axios.get(url),
            fetchById : (id) => axios.get(url + id),
            create : (newRecord) => axios.post(url,newRecord),
            update : (id,updateRecord) => axios.put(url + id,updateRecord),
            delete : (id) => axios.delete(url + id)
        }
    }
}
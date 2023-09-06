import axios from 'axios'

const API_URL = 'http://localhost:8080/api/messages';

class MessageService {

    getAllMessages() {
        console.log("service Message : get all");
        return axios.get(API_URL);
    }

    getMessageById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    createMessage(messageDTO) {
        return axios.post(`${API_URL}`, messageDTO);
    }

    updateMessage(id, messageDTO) {
        return axios.put(`${API_URL}/${id}`, messageDTO);
    }
}

export default new MessageService()
import axios from 'axios'

const API_URL = 'http://localhost:8080/api/subjects';

class SubjectService {

    getAllSubjects() {
        console.log("service subjects : get all");
        return axios.get(API_URL);
    }

    getSubjectById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    createSubject(subjectDTO) {
        return axios.post(`${API_URL}`, subjectDTO);
    }

    updateSubject(id, subjectDTO) {
        return axios.put(`${API_URL}/${id}`, subjectDTO);
    }
}

export default new SubjectService()
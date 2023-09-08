import axios from 'axios'

const API_URL = 'http://localhost:8080/api/depts';

class DeptService {

    getAllDepts() {
        console.log("service depts : get all");
        return axios.get(API_URL);
    }

    getDeptById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    createDept(deptDTO) {
        return axios.post(`${API_URL}`, deptDTO);
    }

    updateDept(id, deptDTO) {
        return axios.put(`${API_URL}/${id}`, deptDTO);
    }
}

export default new DeptService()
import axios from 'axios'

const API_URL = 'http://localhost:8080/api/employees';

class EmployeeService {

    getAllEmployees() {
        console.log("service employees : get all");
        return axios.get(API_URL);
    }

    getEmployeeById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    createEmployee(employeeDTO) {
        return axios.post(`${API_URL}`, employeeDTO);
    }

    updateEmployee(id, employeeDTO) {
        return axios.put(`${API_URL}/${id}`, employeeDTO);
    }
}

export default new EmployeeService()
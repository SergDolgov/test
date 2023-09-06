import axios from 'axios'

const API_URL = 'http://localhost:8080/api/organisations';

class OrganisationService {

    getAllOrganisations() {
        console.log("service Organisation : get all");
        return axios.get(API_URL);
    }

    getOrganisationById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    createOrganisation(organisationDTO) {
        return axios.post(`${API_URL}`, organisationDTO);
    }

    updateOrganisation(id, organisationDTO) {
        return axios.put(`${API_URL}/${id}`, organisationDTO);
    }
}

export default new OrganisationService()